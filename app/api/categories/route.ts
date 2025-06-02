
import { CategoryMongoRepository } from "@/repo/database/categoryRepository";
import mongoClient from "@/lib/db";

export async function GET(req: Request) {
  const categoriesRepo = new CategoryMongoRepository(mongoClient);
  const allCategories = await categoriesRepo.findAll();
  return Response.json(allCategories, { status: 200 });
}
