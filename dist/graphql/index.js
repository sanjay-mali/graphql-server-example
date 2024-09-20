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
const User_1 = require("./User");
function apolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: User_1.User.typeDefs,
            resolvers: {
                Query: Object.assign({}, User_1.User.resolvers.queries),
                Mutation: Object.assign({}, User_1.User.resolvers.mutations),
            },
        });
        yield server.start();
        return server;
    });
}
exports.default = apolloServer;
//  "getUserToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFlZmZlM2ZiLWM4MGMtNGUyYi1hYThhLWU2NmRjYjE2ZjQxNCIsImVtYWlsIjoic2FuamF5LmNvZGFnZUBnbWFpbC5jb20iLCJpYXQiOjE3MjY4MjIyMjd9.EcdQ1WZO8B82KSH_UToWao_oene1rwJG_LKXhsQGhm8"
