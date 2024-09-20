import { ApolloServer } from "@apollo/server";
import { prisma } from "../lib/db";
import axios from "axios";

async function apolloServer() {
  const server = new ApolloServer({
    typeDefs: `
          type Users {
            firstName: String
            lastName: String
            email:String
            password: String
          }

          type Query {
            getTodos: [Todos]
            getUser: [Users]
          }
    
          type Mutation {
            createUser(firstName: String!, lastName: String!, email: String!, password: String!): Users
          }
        `,
    resolvers: {
      Query: {
        getUser: async () => {
          const users = await prisma.user.findMany();
          return users;
        },
      },
      Mutation: {
        createUser: async (
          _,
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
      },
    },
  });
  await server.start();

  return server;
}

export default apolloServer;
