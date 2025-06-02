import { NextRequest, NextResponse } from "next/server";
import mongoClient from "@/lib/db";
import { ObjectId } from "mongodb";
import { AnswerMongoRepository } from "@/repo/database/answerRepository";

export async function PATCH(req: NextRequest, { params }: { params: { _id: string } }) {
    const body = await req.json();
    const { _id: answerId } = await params;
    const { userId, action } = body; 

    if (!userId || !["like", "dislike"].includes(action)) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const repo = new AnswerMongoRepository(mongoClient)
    const rating = await repo.voteAnswer(new ObjectId(answerId), userId, action)
    

    return NextResponse.json({ message: "Vote recorded", rating });
}
