import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Repository } from "../repository";
import { Question } from "@/domain/question";

export interface QuestionRepository extends Repository<Question, ObjectId> {
    
}

export class QuestionMongoRepository extends MongoRepository<Question> implements QuestionRepository {
    constructor(mongoClient : MongoClient) {
        const db = mongoClient.db();
        super(db.collection<Question>("questions"));
    }
}