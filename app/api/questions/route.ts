import mongoClient from "@/lib/db";
import { Roles, User } from "@/domain/user";
import { ObjectId } from "mongodb";
import { QuestionMongoRepository } from "@/repo/database/questionrepository";

export async function POST(req: Request) {
    const { question } = await req.json();

    const questionRepo = new QuestionMongoRepository(mongoClient);

    await questionRepo.save({ question, videoAnswer: "", textAnswer: "" });
    return Response.json({ message: "Question posted" }, {status: 201});
}

export async function GET(req: Request) {
    const questionRepo = new QuestionMongoRepository(mongoClient);

    const allQuestions = await questionRepo.findAll();
    return Response.json(JSON.stringify(allQuestions), {status: 200});
}