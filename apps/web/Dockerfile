FROM node:22-alpine AS builder

ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

# Debug: Show what we received
RUN echo "=== DEBUG INFO ==="
RUN echo "ARG PUBLIC_API_URL received: '$PUBLIC_API_URL'"
RUN echo "ENV PUBLIC_API_URL set to: '$PUBLIC_API_URL'"
RUN env | grep API_URL || echo "No API_URL found in environment"
RUN nslookup host.docker.internal || echo "host.docker.internal not resolved"
RUN curl -f http://host.docker.internal:3002/trpc || echo "API not reachable"
RUN echo "=== END DEBUG ==="


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
RUN npm run build --workspace=@repo/common
RUN npm run build --workspace=@repo/trpc

FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY apps/web/package*.json ./apps/web/
COPY packages/common/package*.json ./packages/common/
COPY packages/trpc/package*.json ./packages/trpc/
COPY packages/ui/package*.json ./packages/ui/

RUN npm ci --omit=dev

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

COPY --from=builder /app/packages ./packages

COPY --from=builder /app/apps/web/package*.json ./

COPY --from=deps /app/node_modules ./node_modules


EXPOSE 4322

CMD ["nginx","-g","daemon off;"]
