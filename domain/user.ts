import { ObjectId } from "mongodb";
import { Entity } from "./entity";

export enum Roles {
  user, admin
}

export interface User extends Entity<ObjectId> {
  name: string;
  password: string;
  email: string;
  role: Roles;
  googleId?: string;
  likes: ObjectId[],
  dislikes: ObjectId[],
  skills: string[],
  bio: string,
  score: number; 
}
