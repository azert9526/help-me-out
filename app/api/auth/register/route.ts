import * as bcrypt from "bcrypt";
import mongoClient from "@/lib/db";
import { UserMongoRepository } from "@/repo/database/userRepository";
import { Roles, User } from "@/domain/user";
import { ObjectId } from "mongodb";
import logger from "@/lib/logger";
import { UserSchema } from "@/validation/schemas";

export async function POST(req: Request) {
    try {
        logger.info("Register request received");
        const { name, email, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRepo = new UserMongoRepository(mongoClient);



        const newUser = { name, email, password: hashedPassword, role: Roles.user, likes: [], dislikes: [], score: 0 }
        const parsed = UserSchema.parse(newUser); // Throws if invalid


        //adaugat verificare unicitate
        const user = await userRepo.findByNameOrEmail(email);
        if (user){ 
            logger.warn("Registered failed: Email already used!");
            return Response.json({ message: "Email already used!" }, {status: 401})
        }


        await userRepo.save(newUser);

        logger.info("Registration succeded!");
        return Response.json({ message: "User registered" }, {status: 201});
    } catch (error) {
        if (error instanceof Error && "issues" in error) {
        return Response.json({
            error: "ValidationError",
            message: "Invalid input",
            details: (error as any).issues,
        }, { status: 400 });
        }
        
        console.log(error)

        return Response.json({
            error: "InternalError",
            message: "Something went wrong",
            details: (error as any).issues
        }, { status: 500 });
    }
}
