import { ObjectId } from "mongodb";
import { Entity } from "./entity";


export interface Answer extends Entity<ObjectId> {
  text?: string;
  video?: string;
  authorID: ObjectId;
  questionID: ObjectId;
  createdDate: Date;
  rating: number; //rating = number of likes - number of dislikes
  likedBy: ObjectId[],
  dislikedBy: ObjectId[]
}
