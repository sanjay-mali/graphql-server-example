import { prisma } from "../../lib/db";
import { getUserById, getUserToken } from "../../lib/service.user";

const queries = {
  getUserToken: async (
    _: any,
    { email, password }: { email: string; password: string }
  ) => {
    const token = await getUserToken({ email, password });
    return token;
  },

  getCurrentUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await getUserById(id);
      return user;
    }

    throw new Error("You are not authenticated");
  },
};

const mutations = {
  createUser: async (
    _: any,
    {
      firstName,
      lastName,
      email,
      password,
    }: { firstName: string; lastName: string; email: string; password: string }
  ) => {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    return newUser;
  },
};

export const resolvers = { queries, mutations };
