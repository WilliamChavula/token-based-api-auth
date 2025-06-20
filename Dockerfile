FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 80

CMD ["node", "dist/src/index.js"]
