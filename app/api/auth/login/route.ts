import { NextResponse } from "next/server";
import { users } from "@/lib/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "shoppigo123";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }

 
  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

  return NextResponse.json(
    { message: "Login successful", token, user: { name: user.name, email: user.email } },
    { status: 200 }
  );
}
