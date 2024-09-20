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
exports.decodeJwt = void 0;
exports.getUserToken = getUserToken;
exports.getUserById = getUserById;
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUserByEmail(email) {
    return db_1.prisma.user.findUnique({ where: { email } });
}
const JWT_SECRET = "$fdwerw@n234gf";
function getUserToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = payload;
        const user = yield getUserByEmail(email);
        if (!user)
            throw new Error("user not found");
        //   const userSalt = user.salt;
        const pwd = user.password;
        //   const usersHashPassword = UserService.generateHash(userSalt, password);
        if (pwd !== user.password)
            throw new Error("Incorrect Password");
        // Gen Token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;
    });
}
const decodeJwt = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
exports.decodeJwt = decodeJwt;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.prisma.user.findUnique({ where: { id } });
    });
}
