import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import { Repository } from "../repository";
import { Answer } from "@/domain/answer";

export interface AnswerRepository extends Repository<Answer, ObjectId> {
    
}

export class AnswerMongoRepository extends MongoRepository<Answer> implements AnswerRepository {
    constructor(mongoClient : MongoClient) {
        const db = mongoClient.db();
        super(db.collection<Answer>("answers"));
    }
}