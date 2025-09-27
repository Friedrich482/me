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

FROM nginx:1.29-alpine AS production

RUN echo 'worker_processes  1; \
events { \
  worker_connections  1024; \
} \
http { \
  server { \
    listen 4322; \
    server_name   _; \
    root   /usr/share/nginx/html; \
    index  index.html index.htm; \
    include /etc/nginx/mime.types; \
    gzip on; \
    gzip_min_length 1000; \
    gzip_proxied expired no-cache no-store private auth; \
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript; \
    error_page 404 /404.html; \
    location = /404.html { \
            root /usr/share/nginx/html; \
            internal; \
    } \
    location / { \
            try_files $uri $uri/index.html =404; \
    } \
  } \
}' > /etc/nginx/nginx.conf

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html/

EXPOSE 4322
