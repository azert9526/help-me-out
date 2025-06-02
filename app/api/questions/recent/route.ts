import { Question } from "@/domain/question";
import { verifySession } from "@/lib/dal";
import mongoClient from "@/lib/db";
import { QuestionMongoRepository, QuestionRepository } from "@/repo/database/questionRepository";
import { QuestionSchema } from "@/validation/schemas";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");

  const questionRepo : QuestionRepository = new QuestionMongoRepository(mongoClient);
  const questions = await questionRepo.getMostRecentQuestionsPaginated(skip, limit);

  return Response.json(questions, { status: 200 });
}
