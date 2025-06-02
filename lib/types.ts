import { JWTPayload } from "jose";
import { ObjectId } from "mongodb";

export type Session = {
    userId: ObjectId | null,
    userName: string
} 

export type SessionPayload =  JWTPayload & Session