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


export async function POST(req: Request) {
    console.log("DADA");
    const { name, password } = await req.json();
    return Response.json({ message: "Logged in" }, {status:201});
}
