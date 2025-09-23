FROM node:22-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY apps/admin/package*.json ./apps/admin/
COPY packages/common/package*.json ./packages/common/
COPY packages/trpc/package*.json ./packages/trpc/
COPY packages/ui/package*.json ./packages/ui/

RUN npm install

COPY . .


RUN npm run build --workspace=admin
RUN npm run build --workspace=@repo/common
RUN npm run build --workspace=@repo/trpc

FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY apps/admin/package*.json ./apps/admin/
COPY packages/common/package*.json ./packages/common/
COPY packages/trpc/package*.json ./packages/trpc/
COPY packages/ui/package*.json ./packages/ui/

RUN npm ci --omit=dev

FROM node:22-alpine AS production

WORKDIR /app

RUN apk update && apk add nginx

RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/http.d/default.conf

COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html/

COPY --from=builder /app/packages ./packages

COPY --from=builder /app/apps/admin/package*.json ./

COPY --from=deps /app/node_modules ./node_modules


EXPOSE 80
CMD ["nginx","-g","daemon off;"]
