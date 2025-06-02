import { ObjectId } from "mongodb";
import { Entity } from "./entity";


export interface Category extends Entity<ObjectId> {
  name: string;
  numberOfQuestions: number;
}