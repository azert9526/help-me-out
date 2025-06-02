import { verifySession } from "@/lib/dal";
import { Session } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await verifySession()

    if (!session) {
        return Response.json({userId: null, userName: ""} as Session, {status: 200})
    }
    return Response.json(session, {status: 200})
}
