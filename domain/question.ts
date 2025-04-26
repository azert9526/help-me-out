import { Entity } from "./entity";

export interface Question<ID> extends Entity<ID> {
  question: string;
  videoAnswer: string;
  textAnswer: string;
}