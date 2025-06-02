import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import { Repository } from "../repository";
import { Category } from "@/domain/category";

export interface CategoryRepository extends Repository<Category, ObjectId> {
    
}

export class CategoryMongoRepository extends MongoRepository<Category> implements CategoryRepository {
    
        constructor(mongoClient : MongoClient) {
            const db = mongoClient.db();
            super(db.collection<Category>("categories"));
        }
}