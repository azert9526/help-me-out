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

export async function getSession(): Promise<SessionPayload | null> {
    // Linia problematică corectată:
    const session = (await cookies()).get('session')?.value
    if (!session) {
        return null;
    }
    const rawPayload = await decrypt(session);

    // Verificare pentru a satisface TypeScript și pentru a returna SessionPayload | null
    if (rawPayload && typeof rawPayload === 'object' && 'userId' in rawPayload && 'userName' in rawPayload) {
        // Opțional: Poți face o conversie explicită a userId la ObjectId dacă e necesar
        // const userId = typeof rawPayload.userId === 'string' ? new ObjectId(rawPayload.userId) : rawPayload.userId;
        return rawPayload as SessionPayload;
    }

    return null; // Returnează null dacă payload-ul nu este valid sau este undefined
}