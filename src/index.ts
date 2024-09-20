import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import apolloServer from "./graphql";
import { decodeJwt } from "./lib/service.user";

async function startServer() {
  const app = express();

  app.use(express.json(), cors());

  app.get("/", (req, res) => {
    res.json({ message: "Hello" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await apolloServer(), {
      context: async ({ req }) => {
        const token = req.headers["authorization"] || null;

        if (!token) {
          return {};
        }

        try {
          const user = decodeJwt(token);
          return { user };
        } catch (error: any) {
          console.error("JWT Error:", error.message);
          return {};
        }
      },
    })
  );

  app.listen(8000, () => console.log("Server started on port 8000"));
}

startServer();
