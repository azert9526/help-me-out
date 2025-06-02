import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import { Repository } from "../repository";
import { Answer } from "@/domain/answer";

export interface AnswerRepository extends Repository<Answer, ObjectId> {
    getPaginatedAnswers(questionId: ObjectId, sortBy: "rating" | "date", skip: number, limit: number) : Promise<Answer[]>
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
}