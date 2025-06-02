import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from 'jose'; // Importă funcțiile relevante din jose
import { decrypt } from "./lib/session";
import { verifySession } from "./lib/dal";


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    
   // const publicPaths = ["/api/auth/login", "/api/auth/register", "/api/test-mongodb"];
    const publicPaths = [
        "/auth/login",
        "/auth/register",
        "/main-window",
        "/api/auth/login",
        "/api/auth/register",
        "/api/test-mongodb",
        "/api/session",
      ];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
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

    const payload = await verifySession();

    if(!payload)
        return NextResponse.redirect(new URL("/auth/login", req.url));

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/api/:path*",        
        "/profile",
      ],
};
