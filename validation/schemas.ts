import { z } from "zod";
import { Answer } from "@/domain/answer";
import { ObjectId } from "mongodb";
import { Roles } from "@/domain/user";

export const objectIdSchema = z
  .string()
  .refine((val) => ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .transform((val) => new ObjectId(val));

export const AnswerSchema = z.object({
  text: z.string().optional(),
  video: z.string().url("Video must be a valid URL").optional(),
  authorID: objectIdSchema,
  questionID: objectIdSchema,
  createdDate: z.coerce.date(),
  rating: z.number(),
  likedBy: z.array(objectIdSchema),
  dislikedBy: z.array(objectIdSchema),
})  
.refine(
  data => data.text || data.video,
  'Either text or video should be in the answer.',
);;


export const QuestionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  authorID: objectIdSchema,
  createdDate: z.coerce.date(),
  categories: z.array(objectIdSchema),
  rating: z.number(),
  likedBy: z.array(objectIdSchema),
  dislikedBy: z.array(objectIdSchema),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(Roles),
  likes: z.array(objectIdSchema),
  dislikes: z.array(objectIdSchema),
  score: z.number().int(),
});