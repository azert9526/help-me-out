import { cookies } from 'next/headers';
import { UserMongoRepository } from '@/repo/database/userRepository';
import mongoClient from '@/lib/db';
import { ObjectId } from 'mongodb';
import { decrypt } from '@/lib/session';

interface MyJWTPayload {
  userId: { buffer: Record<string, number> };
  userName: string;
  iat: number;
  exp: number;
}

export async function GET(req: Request) {
  try {
    const session = (await cookies()).get('session')?.value
    const payload = (await decrypt(session)) as MyJWTPayload | undefined;


    if (!payload || !payload.userId || !payload.userId.buffer) {
      return Response.json({ error: 'Invalid session' }, { status: 400 });
    }

    const buffer = Buffer.from(Object.values(payload.userId.buffer));
    const userId = new ObjectId(buffer);

    const userRepo = new UserMongoRepository(mongoClient); 
    const user =  await userRepo.findById(userId);

    return Response.json(user, { status: 200 });
  } catch (err) {
    console.error('Error loading user:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}


export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const session = (await cookies()).get('session')?.value;
    const payload = (await decrypt(session)) as MyJWTPayload | undefined;

    if (!payload || !payload.userId || !payload.userId.buffer) {
      return Response.json({ error: 'Invalid session' }, { status: 400 });
    }

    const buffer = Buffer.from(Object.values(payload.userId.buffer));
    const userId = new ObjectId(buffer);

    const userRepo = new UserMongoRepository(mongoClient);

    const updatedUser = {
      username: body.username,
      email: body.email,
      bio: body.bio,
      skills: body.skills,
     // birthdate: body.birthdate ? new Date(body.birthdate) : null,
     // avatar: body.avatar,
    };

    // actualizezi userul în DB (metoda update trebuie să o ai în repo)
    const result = await userRepo.update(userId, updatedUser);

    if (!result) {
      return Response.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return Response.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error updating user:', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
