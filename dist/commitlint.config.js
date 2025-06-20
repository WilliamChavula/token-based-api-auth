"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://theodorusclarence.com/shorts/husky-commitlint-prettier
// https://commitlint.js.org/reference/configuration.html
exports.default = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "chore",
                "style",
                "refactor",
                "ci",
                "test",
                "revert",
                "perf",
                "vercel",
            ],
        ],
    },
};
