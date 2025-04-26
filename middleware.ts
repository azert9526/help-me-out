import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    const publicPaths = ["/api/auth/login", "/api/auth/register"];
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
    } catch (e) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/api/:path*"],
};
