import { User as UserGeneric } from "@/domain/user";
import { MongoRepository } from "./mongorepository";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Repository } from "../repository";
import logger from "@/lib/logger";

type User = UserGeneric<ObjectId>

export interface UserRepository extends Repository<User, ObjectId> {
    findByNameOrEmail(name: string) : Promise<User>;
}

export class UserMongoRepository extends MongoRepository<User> implements UserRepository {
    constructor(mongoClient : MongoClient) {
        logger.info("Initializing UserMongoRepository");
        const db = mongoClient.db(process.env.MONGODB_DB_NAME);
        super(db.collection<User>("users"));
        
    }

    async findByNameOrEmail(name: string) : Promise<User> {
        logger.info("Find by name or email : " + name);
        return await this.collection.findOne({
            $or: [
              { email: name },
              { name: name },
            ],
        }) as User;
        
    }
}