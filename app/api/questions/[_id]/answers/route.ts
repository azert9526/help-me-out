
import { NextRequest, NextResponse } from "next/server";
import mongoClient from "@/lib/db";
import { ObjectId } from "mongodb";
import { AnswerMongoRepository } from "@/repo/database/answerRepository";
import { AnswerSchema } from "@/validation/schemas";
import { Answer } from "@/domain/answer";

export async function GET(req: NextRequest, { params }: { params: { _id: string } }) {
    const { _id } = await params
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get("sortBy") || "rating";
    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");

    if(sortBy != "rating" && sortBy != "date")
        return NextResponse.json({message: "sortBy should be either 'rating' or 'date'"}, { status: 400 });
    
    const answerRepo = new AnswerMongoRepository(mongoClient);
    const answers = await answerRepo.getPaginatedAnswers(new ObjectId(_id), sortBy as ("rating" | "date"), skip, limit)

    return NextResponse.json(answers, { status: 201 });
}

export async function POST(req: NextRequest, { params }: { params: { _id: string } }) {
    try {
        const { _id } = await params
        const body = await req.json() as Answer;
        body.questionID = new ObjectId(_id);
        body.createdDate = new Date();
        body.dislikedBy = body.likedBy = []
        body.rating = 0

        console.log(body)
        const parsed = AnswerSchema.parse(body);

        const answerRepo = new AnswerMongoRepository(mongoClient);

        await answerRepo.save(parsed as Answer);
        
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