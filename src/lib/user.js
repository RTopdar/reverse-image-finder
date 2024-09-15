import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ObjectId } from "mongodb";

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return false;
  }
  return user;
};

export const getUserById = async (id) => {
  const userId = ObjectId.createFromHexString(id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return false;
  }
  return user;
};

export const logSignUp = async (id) => {
  const userId = ObjectId.createFromHexString(id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return false;
  }
  await prisma.user.update({
    where: { id: userId },
    data: {
      history: {
        push: new Date(),
      },
    },
  });
  return true;
};
