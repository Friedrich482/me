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

FROM node:22-alpine AS production

WORKDIR /app
RUN apk update && apk add nginx

RUN echo 'server { \
    listen 4322; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/http.d/default.conf


COPY --from=builder /app/apps/web/dist /usr/share/nginx/html/

EXPOSE 4322

CMD ["nginx","-g","daemon off;"]
