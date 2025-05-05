import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
    const publicPaths = ["/api/auth/login", "/api/auth/register", "/api/test-mongodb", "/auth/login", "/auth/register"];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }


    try {
        //jwt.verify(token, JWT_SECRET);
        console.log("am ajuns aici");
        const decoded = jwt.verify(token, JWT_SECRET); // Validează token-ul
        console.log(decoded);
        return NextResponse.next();
    } catch (e) {
        console.log(e);
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/main-window", "/api/:path*"],
};
