export const typeDefs = `#graphql
type User {
  id: ID!
  firstName: String!
  lastName: String
  email: String!
}

type Query {
  getUserToken(email: String!, password: String!): String
  getCurrentUser: User
}

type Mutation {
  createUser(firstName: String, lastName: String, email: String, password: String): User
}

`;
