FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist /dist
COPY package.json .

RUN npm install -g npm@latest && npm install

EXPOSE 7500

CMD ["node", "dist/src/index.js"]
