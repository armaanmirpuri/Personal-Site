import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, message, website } = payload as Record<
    string,
    string
  >;

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !emailPattern.test(email || "") || !message?.trim()) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and message." },
      { status: 400 }
    );
  }

  console.info("Portfolio contact submission", {
    name,
    email,
    company,
    messageLength: message.length
  });

  return NextResponse.json({ ok: true });
}
