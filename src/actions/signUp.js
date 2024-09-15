"use server";
import { getUserByEmail } from "@/lib/user";
import { signUpSchema } from "@/lib/zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const signUp = async (values) => {
  const prisma = new PrismaClient();
  const { name, email, password } = values;
  const result = signUpSchema.safeParse({ name, email, password });
  if (!result.success) {
    console.error("Validation failed. Please check your input.");
    return {
      success: false,
      message: "Validation failed. Please check your input.",
    };
  }
  const validatedFields = result.data;
  console.log("values", validatedFields);
  const passwordHash = bcrypt.hashSync(password, 10);
  console.log("passwordHash", passwordHash);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.error("User already exists");
    return { success: false, message: "User already exists" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      fromGoogle: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      provider: "Credentials",
    },
  });
  //TODO: send email verification
  return { success: true, message: "User created" };
};
