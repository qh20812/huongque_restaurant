import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JWTPayload = {
  id: string;
  email: string;
  role: string;
};

export async function GET(req: Request) {
  try {
    // Get token from cookies
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader
      ?.split(";")
      .find((c) => c.trim().startsWith("hq_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "dev-secret";
    const decoded = jwt.verify(token, secret) as JWTPayload;

    // Fetch user details from database
    const { prisma } = await import("@/app/lib/prisma");
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Session verification failed:", err);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
