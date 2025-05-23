import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import mongoDbClient from "@/lib/db";
import { UserMongoRepository } from "@/repo/database/userrepository";
import { User } from "@/domain/user";
import { ObjectId } from "mongodb";
import { SignJWT } from 'jose';
import logger from "@/lib/logger";

const JWT_SECRET = process.env.JWT_SECRET!;


//todo: validare date la tot
export async function POST(req: Request) {
  const { name, password } = await req.json();

  logger.info("Log in request received");
  const userRepo = new UserMongoRepository(mongoDbClient);


  const user = await userRepo.findByNameOrEmail(name);

  if (!user) return Response.json({ message: "Invalid credentials" }, {status: 401})
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){ 
    logger.warn("Log in failed: invalid credentials!");
    return Response.json({ message: "Invalid credentials" }, {status: 401})
  }
/*
  const token = jwt.sign(
    { _id: user._id.toString(), email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
*/

//merge asa folosit functie din jose
  const token = await new SignJWT({ _id: user._id.toString(), email: user.email, role: user.role })
  .setProtectedHeader({ alg: 'HS256' }) 
  .setExpirationTime('180s')//3minute de aici se schimba duarata sesiunii
  .sign(new TextEncoder().encode(JWT_SECRET)); 


  //todo: probleme cu csrf??
  //maxAge s-ar putea sterge cred, e redundnat, gestionarea are loc la nivel de JWT 
  const headers = {"Set-Cookie": cookie.serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 de zile
  })};

  logger.info("Login in succeeded!");
  return Response.json({ message: "Logged in" }, {status:201, headers});
}
