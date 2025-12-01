import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type Body = {
  identifier?: string; // email or username (name field)
  password?: string;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    const { identifier, password } = body;

    if (!identifier || typeof identifier !== "string") {
      return NextResponse.json({ message: "Vui lòng nhập email hoặc tên đăng nhập" }, { status: 400 });
    }
    if (!password || typeof password !== "string") {
      return NextResponse.json({ message: "Vui lòng nhập mật khẩu" }, { status: 400 });
    }

    // import prisma client dynamically so errors are caught
    const { prisma } = await import("../../lib/prisma");

    // find user by email or name
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng" }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "dev-secret";
    const payload = { id: user.id, email: user.email, role: user.role } as const;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    const res = NextResponse.json({ message: "Đăng nhập thành công", user: { id: user.id, email: user.email, name: user.name, role: user.role } });

    // Set token cookie (HttpOnly)
    const cookieOptions = {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" as const : ("lax" as const),
    };

    res.cookies.set("hq_token", token, cookieOptions);
    return res;
  } catch (err) {
    console.error("/api/dang-nhap error:", err);
    const devMsg = err instanceof Error ? err.message : String(err);
    const message = process.env.NODE_ENV === "development" ? devMsg : "Lỗi máy chủ";
    return NextResponse.json({ message }, { status: 500 });
  }
}
