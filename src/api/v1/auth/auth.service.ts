import prisma from "../../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../../../config/env";
import { type RegisterInput } from "./auth.schema";


export const registerUser = async (data: RegisterInput) => {
  const { username, first_name, last_name, email, password } = data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, firstName: first_name ?? null, lastName: last_name ?? null, email, password: hashed },
  });

  const token = jwt.sign({ id: user.id, email }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, token };

};

