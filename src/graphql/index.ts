import { ApolloServer } from "@apollo/server";
import { User } from "./User";

async function apolloServer() {
  const server = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
    `,
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
