FROM node:22-alpine AS builder

ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY apps/web/package*.json ./apps/web/
COPY packages/common/package*.json ./packages/common/
COPY packages/trpc/package*.json ./packages/trpc/
COPY packages/ui/package*.json ./packages/ui/

RUN npm install

COPY . .

RUN npm run build --workspace=web

FROM nginxinc/nginx-unprivileged:stable-alpine3.21-slim AS production

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html/

EXPOSE 8080