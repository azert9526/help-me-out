import * as bcrypt from "bcrypt";
import mongoClient from "@/lib/db";
import { UserMongoRepository } from "@/repo/database/userrepository";
import { Roles, User } from "@/domain/user";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRepo = new UserMongoRepository(mongoClient);

    //adaugat verificare unicitate
    const user = await userRepo.findByNameOrEmail(email);
    if (user) return Response.json({ message: "Email already used!" }, {status: 401})


    await userRepo.save({ name, email, password: hashedPassword, role: Roles.user });
    return Response.json({ message: "User registered" }, {status: 201});
}
