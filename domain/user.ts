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
  likes: ObjectId[],
  dislikes: ObjectId[],
  score: number; 
}
