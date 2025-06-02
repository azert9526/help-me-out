import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from './types'
import { ObjectId } from 'mongodb'
import { cookies } from 'next/headers'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId: ObjectId, userName: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7 zile
    const session = await encrypt({ userId, userName });
    const cookieStore = await cookies()

    cookieStore.set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt
    });
}
 
export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)
    
    if (!session || !payload) {
        return null
    }
    
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7 zile
    
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}