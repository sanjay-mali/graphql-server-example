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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client"); // PrismaClient should be used
const prisma = new client_1.PrismaClient(); // Initialize Prisma Client
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const server = new server_1.ApolloServer({
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
                    getTodos: () => __awaiter(this, void 0, void 0, function* () { return (yield axios_1.default.get("https://jsonplaceholder.typicode.com/todos")).data; }),
                },
                Mutation: {
                    createUser: (_1, _a) => __awaiter(this, [_1, _a], void 0, function* (_, { firstName, lastName, email, password, }) {
                        const newUser = yield prisma.user.create({
                            data: {
                                firstName,
                                lastName,
                                email,
                                password,
                            },
                        });
                        return newUser; // Return the created user data
                    }),
                },
            },
        });
        yield server.start();
        app.use(express_1.default.json(), (0, cors_1.default)());
        app.get("/", (req, res) => {
            res.json({ message: "Hello" });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(server));
        app.listen(8000, () => console.log("Server started on port 8000"));
    });
}
startServer();
