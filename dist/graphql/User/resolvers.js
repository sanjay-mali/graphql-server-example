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
exports.resolvers = void 0;
const db_1 = require("../../lib/db");
const service_user_1 = require("../../lib/service.user");
const queries = {
    getUserToken: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
        const token = yield (0, service_user_1.getUserToken)({ email, password });
        return token;
    }),
    getCurrentUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const user = yield (0, service_user_1.getUserById)(id);
            return user;
        }
        throw new Error("You are not authenticated");
    }),
};
const mutations = {
    createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email, password, }) {
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
};
exports.resolvers = { queries, mutations };
