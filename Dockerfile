FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 7500

CMD ["node", "dist/src/index.js"]
