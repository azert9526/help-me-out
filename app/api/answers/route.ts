import { verifySession } from "@/lib/dal";
import mongoClient from "@/lib/db";
import { AnswerMongoRepository } from "@/repo/database/answerRepository";
import { AnswerSchema } from "@/validation/schemas";

export async function POST(req: Request) {
  const session = await verifySession()

  try {
    const body = await req.json();

    const parsed = AnswerSchema.parse(body); // Throws if invalid

    const answerRepo = new AnswerMongoRepository(mongoClient);
    await answerRepo.save(parsed);
    
    return Response.json({ message: "Answer posted" }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "issues" in error) {
      return Response.json({
        error: "ValidationError",
        message: "Invalid input",
        details: (error as any).issues,
      }, { status: 400 });
    }

    return Response.json({
      error: "InternalError",
      message: "Something went wrong",
    }, { status: 500 });
  }
}
