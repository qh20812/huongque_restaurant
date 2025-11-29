import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { prisma } = await import("../../lib/prisma");
    const dishes = await prisma.dish.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ dishes }, { status: 200 });
  } catch (err) {
    console.error("/api/thuc-don error:", err);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
