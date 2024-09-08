import bcrypt from "bcrypt";
import { connectToDb } from "@/db/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// export async function POST(req) {
//   const { email, password, name } = await req.json();

//   if (!email || !password || !name) {
//     return NextResponse.json(
//       { message: "Email, password, and name are required" },
//       { status: 400 }
//     );
//   }

//   const db = await connectToDb();
//   if (!db) {
//     return NextResponse.json(
//       { message: "Failed to connect to the database" },
//       { status: 500 }
//     );
//   }

//   const existingUser = await db.collection("Users").findOne({ email });
//   if (existingUser) {
//     return NextResponse.json(
//       { message: "User already exists" },
//       { status: 400 }
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 12);
//   const result = await db.collection("Users").insertOne({
//     email,
//     password: hashedPassword,
//     name,
//     createdAt: new Date(),
//     fromGoogle: false,
//   });

//   if (result.insertedId) {
//     return NextResponse.json(
//       { message: "User created successfully" },
//       { status: 201 }
//     );
//   }

//   return NextResponse.json(
//     { message: "Failed to create user" },
//     { status: 500 }
//   );
// }

const prisma = new PrismaClient();

export async function POST(req) {
  const user = await req.json();
  const { email, password, name } = user;

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Email, password, and name are required" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      fromGoogle: false,
    },
  });
  return NextResponse.json(
    { message: "User created successfully", user: newUser },
    { status: 201 }
  );
}
