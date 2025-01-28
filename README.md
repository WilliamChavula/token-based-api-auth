Simple API built with Fastify and Drizzle ORM.

## Features
- [x] Sign up operations for users
- [x] Sign in operations for users
- [x] Sign out operations for users
- [x] Token Authentication
- [x] Token hashing with HMAC

## Tech Stack
- [Fastify](https://fastify.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)
- [Husky](https://typicode.github.io/husky/)
- [ESLint](https://eslint.org/)

## Endpoints
- `POST /auth/signup` - Sign up a new user
- `POST /auth/signin` - Sign in an existing user
- `POST /auth/signout` - Sign out a user
- `GET /health` - Check the health of the API