import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Repository } from "../repository";
import { Question } from "@/domain/question";

export interface QuestionRepository extends Repository<Question, ObjectId> {
    getMostRecentQuestionsPaginated(skip: number, limit: number) : Promise<Question[]>
}

export class QuestionMongoRepository extends MongoRepository<Question> implements QuestionRepository {
    constructor(mongoClient : MongoClient) {
        const db = mongoClient.db();
        super(db.collection<Question>("questions"));
    }

    async getMostRecentQuestionsPaginated(skip: number, limit: number) : Promise<Question[]> {
        return await this.collection
            .find({})
            .sort({ createdDate: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }
}