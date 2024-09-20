import { prisma } from "../../lib/db";

const queries = {
  getUser: async () => {
    const users = await prisma.user.findMany();
    return users;
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
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
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
