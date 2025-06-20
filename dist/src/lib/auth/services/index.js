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
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const drizzle_orm_1 = require("drizzle-orm");
const models_1 = require("../models");
const utilities_1 = require("../utilities");
exports.default = (0, fastify_plugin_1.default)(function (fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.decorate("authService", {
            createUser(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { password } = data;
                    const hashedPassword = yield utilities_1.bcryptHash.hash(password);
                    const [user] = yield fastify.db
                        .insert(models_1.usersTable)
                        .values(Object.assign(Object.assign({}, data), { password: hashedPassword }))
                        .returning();
                    return user;
                });
            },
            getUserByEmail(email) {
                return __awaiter(this, void 0, void 0, function* () {
                    const [user] = yield fastify.db
                        .select()
                        .from(models_1.usersTable)
                        .where((0, drizzle_orm_1.eq)(models_1.usersTable.email, email));
                    return user;
                });
            },
            createToken(email) {
                return __awaiter(this, void 0, void 0, function* () {
                    const [user] = yield fastify.db
                        .select()
                        .from(models_1.usersTable)
                        .where((0, drizzle_orm_1.eq)(models_1.usersTable.email, email));
                    if (!user)
                        throw new Error("User not found");
                    const token = utilities_1.tokenStore.generateTokenId();
                    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
                    yield fastify.db
                        .insert(models_1.tokenTable)
                        .values({ userId: user.userId, tokenId: token, expiry });
                    return token;
                });
            },
            readToken(tokenId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const [token] = yield fastify.db
                        .select()
                        .from(models_1.tokenTable)
                        .where((0, drizzle_orm_1.eq)(models_1.tokenTable.tokenId, tokenId));
                    if (!token)
                        return null;
                    return {
                        userId: token.userId,
                        tokenId: token.tokenId,
                        expiry: token.expiry,
                    };
                });
            },
            deleteToken(tokenId) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fastify.db
                        .delete(models_1.tokenTable)
                        .where((0, drizzle_orm_1.eq)(models_1.tokenTable.tokenId, tokenId));
                });
            },
            verifyToken(tokenRaw) {
                return __awaiter(this, void 0, void 0, function* () {
                    const tokenIndex = tokenRaw.lastIndexOf(".");
                    if (tokenIndex === -1)
                        return null;
                    const token = tokenRaw.substring(0, tokenIndex);
                    const tokenData = yield fastify.authService.readToken(token);
                    if (!tokenData)
                        return null;
                    const tokenHash = tokenRaw.substring(tokenIndex + 1);
                    const computedHash = utilities_1.tokenStore.computeHash(tokenData.tokenId);
                    if (!utilities_1.tokenStore.compareHash(tokenHash, computedHash))
                        return null;
                    const { expiry } = tokenData;
                    if (expiry < new Date()) {
                        yield fastify.authService.deleteToken(token);
                        return null;
                    }
                    return tokenData;
                });
            },
        });
    });
});
