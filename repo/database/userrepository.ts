import { User as UserGeneric } from "@/domain/user";
import { MongoRepository } from "./mongorepository";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Repository } from "../repository";

type User = UserGeneric<ObjectId>

export interface UserRepository extends Repository<User, ObjectId> {
    findByNameOrEmail(name: string) : Promise<User>;
}

export class UserMongoRepository extends MongoRepository<User> implements UserRepository {
    constructor(mongoClient : MongoClient) {
        const db = mongoClient.db();
        super(db.collection<User>("users"));
    }

    async findByNameOrEmail(name: string) : Promise<User> {
        return await this.collection.findOne({
            $or: [
              { email: name },
              { name: name },
            ],
        }) as User;
        
    }
}