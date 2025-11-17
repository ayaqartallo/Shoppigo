import { NextResponse } from "next/server";
import { users } from "@/lib/users";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return NextResponse.json(
      { message: "Email not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message:
        "A password reset link has been sent to your email (simulation).",
    },
    { status: 200 }
  );
}
