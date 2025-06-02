import { Question } from "@/domain/question";
import { verifySession } from "@/lib/dal";
import mongoClient from "@/lib/db";
import { QuestionMongoRepository } from "@/repo/database/questionRepository";
import { QuestionSchema } from "@/validation/schemas";

export async function POST(req: Request) {
  const session = await verifySession()
  
  try {
    const body = await req.json();
    const validated = QuestionSchema.parse(body) as Question;

    const questionRepo = new QuestionMongoRepository(mongoClient);
    await questionRepo.save(validated);

    return Response.json({ message: "Question posted" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "issues" in error) {
      return Response.json(
        {
          error: "ValidationError",
          message: "Invalid input",
          details: (error as any).issues,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        error: "InternalError",
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const questionRepo = new QuestionMongoRepository(mongoClient);
  const allQuestions = await questionRepo.findAll();
  return Response.json(allQuestions, { status: 200 });
}
