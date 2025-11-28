import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Đã đăng xuất" });
  res.cookies.set("hq_token", "", { path: "/", maxAge: 0 });
  return res;
}
