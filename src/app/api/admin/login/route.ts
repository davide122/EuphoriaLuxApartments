import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, getAdminPassword, getAdminToken } from "@/lib/admin/auth";

export async function POST(req: Request) {
  const password = getAdminPassword();
  const token = getAdminToken();

  if (!password || !token) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  const raw = typeof body?.password === "string" ? body.password : "";

  if (raw.trim() !== password) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return NextResponse.json({ ok: true });
}

