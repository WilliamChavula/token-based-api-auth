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
exports.default = default_1;
const http_status_codes_1 = require("http-status-codes");
const services_1 = __importDefault(require("../services"));
const schemas_1 = require("../schemas");
const utilities_1 = require("../utilities");
function default_1(fastify) {
    fastify.register(services_1.default);
    fastify.route({
        url: "/sign-up",
        method: "POST",
        schema: {
            body: (0, schemas_1.$ref)("insertUserSchema"),
            response: {
                201: (0, schemas_1.$ref)("selectUserSchema"),
            },
        },
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const user = yield fastify.authService.createUser(body);
            reply.code(http_status_codes_1.StatusCodes.CREATED).send(user);
        }),
    });
    fastify.route({
        url: "/sign-in",
        method: "POST",
        schema: {
            body: (0, schemas_1.$ref)("loginUserSchema"),
            response: {
                200: { type: "object", properties: { token: { type: "string" } } },
            },
        },
        preHandler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield fastify.authService.getUserByEmail(email);
            if (!user) {
                return reply.code(http_status_codes_1.StatusCodes.UNAUTHORIZED).send("Invalid credentials");
            }
            const isValid = yield utilities_1.bcryptHash.compare(password, user.password);
            if (!isValid) {
                return reply.code(http_status_codes_1.StatusCodes.UNAUTHORIZED).send("Invalid credentials");
            }
        }),
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const token = yield fastify.authService.createToken(email);
            const tokenHMac = utilities_1.tokenStore.hmacToken(token);
            reply.send({ token: tokenHMac });
        }),
    });
    fastify.route({
        url: "/sign-out",
        method: "POST",
        handler: (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token) {
                return reply
                    .code(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .send("You are not logged in");
            }
            const index = "Bearer ".length;
            const verifiedToken = yield fastify.authService.verifyToken(token.substring(index));
            if (!verifiedToken) {
                return reply
                    .code(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                    .send("You are not logged in");
            }
            yield fastify.authService.deleteToken(verifiedToken.tokenId);
            return reply.code(http_status_codes_1.StatusCodes.OK).send();
        }),
    });
}
