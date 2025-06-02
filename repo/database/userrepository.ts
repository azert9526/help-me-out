import { User } from "@/domain/user";
import { MongoRepository } from "./mongoRepository";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { Repository } from "../repository";
import logger from "@/lib/logger";


export interface UserRepository extends Repository<User, ObjectId> {
    findByNameOrEmail(name: string): Promise<User>;
}

export class UserMongoRepository extends MongoRepository<User> implements UserRepository {
    constructor(mongoClient: MongoClient) {
        logger.info("Initializing UserMongoRepository");
        const db = mongoClient.db();
        super(db.collection<User>("users"));

    }

    async findByNameOrEmail(name: string): Promise<User> {
        logger.info("Find by name or email : " + name);
        return await this.collection.findOne({
            $or: [
                { email: name },
                { name: name },
            ],
        }) as User;
    }

    /*
    return the first numberOfUsers highest rated users
    */
    async getUsersWithHighestScore(numberOfUsers: number): Promise<User[]> {
        return await this.collection
            .find({}, { projection: { name: 1, score: 1, _id: 0 } })
            .sort({ score: -1 })
            .limit(numberOfUsers)
            .toArray();
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        logger.info(`Searching for user with Google ID: ${googleId}`);
        return await this.collection.findOne({ googleId: googleId });
    }
}