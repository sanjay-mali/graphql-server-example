import { prisma } from "./db";
import JWT from "jsonwebtoken";

export interface GetUserTokenPayload {
  email: string;
  password: string;
}

function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
const JWT_SECRET = "$fdwerw@n234gf";

export async function getUserToken(payload: GetUserTokenPayload) {
  const { email, password } = payload;
  const user = await getUserByEmail(email);
  if (!user) throw new Error("user not found");

  const pwd = user.password;

  if (pwd !== user.password) throw new Error("Incorrect Password");

  // Gen Token
  const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
  return token;
}

export const decodeJwt = (token: string) => {
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
