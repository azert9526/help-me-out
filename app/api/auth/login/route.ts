import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import mongoDbClient from "@/lib/db";
import { UserMongoRepository } from "@/repo/database/userRepository";
import { User } from "@/domain/user";
import { ObjectId } from "mongodb";
import { SignJWT } from 'jose';
import logger from "@/lib/logger";
import { createSession } from "@/lib/session";

const JWT_SECRET = process.env.JWT_SECRET!;


//todo: validare date la tot
export async function POST(req: Request) {
    const { name, password } = await req.json();

    logger.info("Log in request received");
    const userRepo = new UserMongoRepository(mongoDbClient);


    const user = await userRepo.findByNameOrEmail(name);

    if (!user) return Response.json({ message: "Invalid credentials" }, {status: 401})
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){ 
        logger.warn("Log in failed: invalid credentials!");
        return Response.json({ message: "Invalid credentials" }, {status: 401})
    }

    await createSession(user._id, user.name)

    return Response.json({ message: "Logged in" }, {status:201});
}
