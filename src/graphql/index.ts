import { ApolloServer } from "@apollo/server";
import { User } from "./User";

interface MyContext {
  user?: { id: string; email: string };
}

async function apolloServer() {
  const server = new ApolloServer<MyContext>({
    typeDefs: User.typeDefs,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();
  return server;
}

export default apolloServer;

//  "getUserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlZmZlM2ZiLWM4MGMtNGUyYi1hYThhLWU2NmRjYjE2ZjQxNCIsImVtYWlsIjoic2FuamF5LmNvZGFnZUBnbWFpbC5jb20iLCJpYXQiOjE3MjY4MjIyMjd9.EcdQ1WZO8B82KSH_UToWao_oene1rwJG_LKXhsQGhm8"
