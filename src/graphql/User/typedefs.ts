export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
    }

    type Query {
        getUser: [User] 
    }

    type Mutation {
        createUser(firstName: String, lastName: String, email: String, password: String): User
    }
`;
