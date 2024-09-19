import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import axios from "axios";
import { PrismaClient } from "@prisma/client"; // PrismaClient should be used

const prisma = new PrismaClient(); // Initialize Prisma Client

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs: `
      type Todos {
        id: ID!
        title: String!
        completed: Boolean
      }

      type TCreateUser {
        firstName: String
        lastName: String
        email: String
        password: String
      }

      type Query {
        getTodos: [Todos]
      }

      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): TCreateUser
      }
    `,
    resolvers: {
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
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
          return newUser; // Return the created user data
        },
      },
    },
  });

  await server.start();

  app.use(express.json(), cors());

  app.get("/", (req, res) => {
    res.json({ message: "Hello" });
  });

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Server started on port 8000"));
}

startServer();
