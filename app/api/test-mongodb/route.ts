import { NextResponse } from 'next/server';
import client from "@/lib/db";


export async function GET() {
  try {
    
    await client.connect()
    const dbName = process.env.MONGODB_DB_NAME;
    const db = client.db(dbName)

    const collections = await db.listCollections().toArray()


    return NextResponse.json({
      success: true,
      collections: collections.map(col => col.name),
    })
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, error: err }, { status: 500 })
  }
}
