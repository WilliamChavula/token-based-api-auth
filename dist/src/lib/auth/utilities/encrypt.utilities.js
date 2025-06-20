"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStore = void 0;
var crypto_1 = __importDefault(require("crypto"));
var config_1 = require("../../config");
exports.tokenStore = {
    generateTokenId: function () {
        return crypto_1.default.randomBytes(20).toString("hex");
    },
    computeHash: function (tokenId) {
        var hash = crypto_1.default.createHmac("sha256", config_1.config.HASH_KEY);
        return hash.update(tokenId).digest("hex");
    },
    hmacToken: function (tokenId) {
        var tokenHash = this.computeHash(tokenId);
        return "".concat(tokenId, ".").concat(tokenHash);
    },
    compareHash: function (tokenHash, computedHash) {
        return crypto_1.default.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(computedHash));
    },
};
