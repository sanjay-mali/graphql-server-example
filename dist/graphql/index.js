"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const db_1 = require("../lib/db");
function apolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
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
                    getUser: () => __awaiter(this, void 0, void 0, function* () {
                        const users = yield db_1.prisma.user.findMany();
                        return users;
                    }),
                },
                Mutation: {
                    createUser: (_1, _a) => __awaiter(this, [_1, _a], void 0, function* (_, { firstName, lastName, email, password, }) {
                        const newUser = yield db_1.prisma.user.create({
                            data: {
                                firstName,
                                lastName,
                                email,
                                password,
                            },
                        });
                        return newUser;
                    }),
                },
            },
        });
        yield server.start();
        return server;
    });
}
exports.default = apolloServer;
