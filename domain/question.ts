import { ObjectId } from "mongodb";
import { Entity } from "./entity";


export interface Question extends Entity<ObjectId> {
  title: string;
  description?: string;
  authorID: ObjectId;
  createdDate: Date;
  categories: ObjectId[];
  rating: number; //rating = number of likes - number of dislikes
  likedBy: ObjectId[],
  dislikedBy: ObjectId[]
}