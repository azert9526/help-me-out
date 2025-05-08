import { Entity } from "./entity";

export interface Question<ID> extends Entity<ID> {
  //question: string;
  //videoAnswer: string;
  //textAnswer: string;
  title: string;
  description: string;
  authorID: ID;
  createdDate: string;
  //poate fi redundant, se poate renunta
  answerCount: number;
  category: string;

}