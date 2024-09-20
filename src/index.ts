import express from "express";

import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import apolloServer from "./graphql";


async function startServer() {
  const app = express();

  app.use(express.json(), cors());

  app.get("/", (req, res) => {
    res.json({ message: "Hello" });
  });

  app.use("/graphql", expressMiddleware(await apolloServer()));

  app.listen(8000, () => console.log("Server started on port 8000"));
}

startServer();
