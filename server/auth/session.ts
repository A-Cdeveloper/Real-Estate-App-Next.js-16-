import { cookies } from "next/headers";
import { Role } from "@prisma/client";

const SESSION_COOKIE_NAME = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionData = {
  userId: string;
  role: Role;
};

/**
 * Creates a session cookie with userId and role
 */
export async function createSession(userId: string, role: Role): Promise<void> {
  const cookieStore = await cookies();

  const sessionData: SessionData = {
    userId,
    role,
  };

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

/**
 * Reads session from cookie
 * Returns null if session doesn't exist or is invalid
 */
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const sessionData = JSON.parse(sessionCookie.value) as SessionData;
    return sessionData;
  } catch {
    return null;
  }
}

/**
 * Deletes session cookie
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
