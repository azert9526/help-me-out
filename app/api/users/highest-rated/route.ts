import { UserMongoRepository } from "@/repo/database/userRepository";
import mongoClient from "@/lib/db";

export async function GET(req: Request) {
  const userRepo = new UserMongoRepository(mongoClient); 
  const topUsers = await userRepo.getUsersWithHighestScore(5);
  return Response.json(topUsers, { status: 200 });
}
