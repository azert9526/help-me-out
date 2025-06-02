import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import { Repository } from "../repository";
import { Answer } from "@/domain/answer";

export interface AnswerRepository extends Repository<Answer, ObjectId> {
    getPaginatedAnswers(questionId: ObjectId, sortBy: "rating" | "date", skip: number, limit: number) : Promise<Answer[]>
    voteAnswer(answerId : ObjectId, userId : ObjectId, action: "like" | "dislike") : Promise<number> 
}

export class AnswerMongoRepository extends MongoRepository<Answer> implements AnswerRepository {
    constructor(mongoClient : MongoClient) {
        const db = mongoClient.db();
        super(db.collection<Answer>("answers"));
    }

    async getPaginatedAnswers(questionId: ObjectId, sortBy: "rating" | "date", skip: number, limit: number) : Promise<Answer[]> {
        return await this.collection
            .find({ questionID: questionId })
            .sort(sortBy === "rating" ? { rating: -1 } : { createdDate: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    async voteAnswer(answerId : ObjectId, userId : ObjectId, action: "like" | "dislike") : Promise<number> {
        // Remove user from both arrays first
        await this.collection.updateOne(
            { _id: answerId },
            {
            $pull: { likedBy: userId, dislikedBy: userId },
            }
        );

        // Add to correct array
        const updateField = action === "like" ? "likedBy" : "dislikedBy";
        await this.collection.updateOne(
            { _id: answerId },
            {
            $addToSet: { [updateField]: userId },
            }
        );

        // Recalculate rating
        const updated = await this.collection.findOne({ _id: answerId });
        const rating =
            (updated!.likedBy?.length || 0) - (updated!.dislikedBy?.length || 0);

        await this.collection.updateOne({ _id: answerId }, { $set: { rating } });
        return rating
    }
}