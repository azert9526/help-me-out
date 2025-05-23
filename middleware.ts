import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from 'jose'; // Importă funcțiile relevante din jose


const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
   // const publicPaths = ["/api/auth/login", "/api/auth/register", "/api/test-mongodb"];
    const publicPaths = [
        "/auth/login",
        "/auth/register",
        "/api/auth/login",
        "/api/auth/register",
        "/api/test-mongodb",
      ];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;

    

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    /*

    try {
        console.log("intra aici");
        jwt.verify(token, JWT_SECRET);
        console.log("aici gata");
        return NextResponse.next();
    } catch (e) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }*/

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        console.log("Token is valid:", payload);
        return NextResponse.next();
    } catch (e) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

}

export const config = {
    matcher: [
        "/api/:path*",        
        "/profile",
      ],};
