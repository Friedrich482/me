ARG NODE_VERSION=24.13.0-alpine
ARG NGINXINC_IMAGE_TAG=alpine3.23

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package*.json package-lock.json* .npmrc ./
COPY turbo.json ./

# We also need to copy and build the API to generate the types that the dashboard needs to be built
COPY apps/admin/package*.json ./apps/admin/
COPY apps/api/package*.json ./apps/api/
COPY packages/common/package*.json ./packages/common/
COPY packages/trpc/package*.json ./packages/trpc/
COPY packages/ui/package*.json ./packages/ui/

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build --workspace=@repo/common
RUN npm run build --workspace=api
RUN npm run build --workspace=admin

FROM nginxinc/nginx-unprivileged:${NGINXINC_IMAGE_TAG} AS runner

WORKDIR /app

RUN echo 'worker_processes  1; \
pid /tmp/nginx.pid; \
events { \
    worker_connections 1024; \
} \
http { \
    include       /etc/nginx/mime.types; \
    default_type  application/octet-stream; \
    access_log /dev/stdout; \
    error_log  /dev/stderr; \
    sendfile        on; \
    tcp_nopush      on; \
    tcp_nodelay     on; \
    keepalive_timeout  65; \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
    gzip_min_length 256; \
    server { \
        listen       5174; \
        server_name  localhost; \
        root /usr/share/nginx/html; \
        index index.html; \
        location / { \
           try_files $uri $uri.html $uri/ /index.html; \
        } \
    } \
} \
' > /etc/nginx/nginx.conf

COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

USER nginx

EXPOSE 5174

CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
