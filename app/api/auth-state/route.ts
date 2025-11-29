import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type TokenPayload = {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("hq_token")?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    const secret = process.env.JWT_SECRET || "dev-secret";
    let payload: TokenPayload | null = null;
    try {
      payload = jwt.verify(token, secret) as TokenPayload;
    } catch (err) {
      // token invalid or expired
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    return NextResponse.json(
      {
        authenticated: true,
        user: { id: payload.id, email: payload.email, role: payload.role },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("/api/auth-state error", err);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
