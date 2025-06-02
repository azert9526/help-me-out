import { Question } from "@/domain/question";
import mongoClient from "@/lib/db";
import { QuestionMongoRepository } from "@/repo/database/questionRepository";
import { QuestionSchema } from "@/validation/schemas";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { _id: string } }) {
  const { _id } = await params
  const questionRepo = new QuestionMongoRepository(mongoClient);
  const question = await questionRepo.findById(new ObjectId(_id));

  return Response.json(question, { status: 200 });
}
