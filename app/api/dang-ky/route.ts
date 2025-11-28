import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type Body = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validateEmail(email: string) {
  // Basic email validation
  return /\S+@\S+\.\S+/.test(email);
}

export async function POST(req: Request) {
  try {
    if (process.env.NODE_ENV === "development")
      console.log("/api/dang-ky: start POST handler");
    const body: Body = await req.json();
    const { name, email, password, confirmPassword } = body;

    if (!email || typeof email !== "string" || !validateEmail(email)) {
      return NextResponse.json(
        { message: "Email không hợp lệ" },
        { status: 400 }
      );
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "Mật khẩu cần ít nhất 6 ký tự" },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Mật khẩu không khớp" },
        { status: 400 }
      );
    }

    // import prisma client dynamically so import errors are handled
    if (process.env.NODE_ENV === "development")
      console.log("/api/dang-ky: importing prisma");
    const { prisma } = await import("../../lib/prisma");
    if (process.env.NODE_ENV === "development")
      console.log("/api/dang-ky: prisma imported successfully");

    // check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Email đã được sử dụng" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: name ?? null,
        role: "user",
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    // Create JWT token and set as HTTP-only cookie (same behavior as đăng-nhap)
    const secret = process.env.JWT_SECRET || "dev-secret";
    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: "user",
    } as const;
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    const res = NextResponse.json(
      { message: "Đăng ký thành công", user: newUser },
      { status: 201 }
    );

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? ("strict" as const)
          : ("lax" as const),
    };

    res.cookies.set("hq_token", token, cookieOptions);
    return res;
  } catch (err) {
    console.error("/api/dang-ky error:", err);
    // handle prisma unique constraint error (if it occurs during create)
    // Prisma unique constraint error handling
    if (
      err &&
      typeof err === "object" &&
      Object.prototype.hasOwnProperty.call(err, "code") &&
      (err as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { message: "Email đã được sử dụng" },
        { status: 409 }
      );
    }
    const devMsg = err instanceof Error ? err.message : String(err);
    const message =
      process.env.NODE_ENV === "development" ? devMsg : "Lỗi máy chủ";
    return NextResponse.json({ message }, { status: 500 });
  }
}
