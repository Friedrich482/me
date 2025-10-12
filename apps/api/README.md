<p align="center">
  <img width="200" height="200" alt="Friedrich WEKENON TOKPONTO's signature" src="https://github.com/user-attachments/assets/843cbb02-439c-468b-bcc6-101ff74cc17b" />
</p>

<h1 align="center">me API</h1>
<p align="center">The API for my personal website, portfolio and blog<br/>
<a href="https://api.friedrichwt.dev">api.friedrichwt.dev</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-05df72" >  
  <img src="https://img.shields.io/badge/LICENSE-MIT-05df72">
</p>

## Description

This project is the API used to power the other main packages in the monorepo: [admin dashboard](../admin) and [web](../web).
It is built on top of [Nestjs](https://nestjs.com/) and powered by [tRPC](https://trpc.io/).

## Project setup

To run the API, you need to first clone the repository

```bash
git clone https://github.com/Friedrich482/me.git
```

Then `cd` in the API

```bash
cd apps/api
```

Then install dependencies

```bash
npm install
```

Before continuing you'll need some environment variables.

### Environment variables

- `NODE_ENV`:

  ```bash
  NODE_ENV=development
  ```

- `DATABASE_URL`, you can use:

  ```bash
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/me"
  ```

  [compose.yaml](./compose.yaml)

  (Local database set up by docker compose as a docker volume. If you don't have docker installed, follow that link to the installation: [Docker](https://docs.docker.com/get-started/get-docker/))

- `JWT_SECRET`: Generate an SSL 64-character hexadecimal string.

  ```bash
  openssl rand -hex 32
  ```
  
- `ADMIN_DASHBOARD_URL`:

```bash
ADMIN_DASHBOARD_URL=http://localhost:5173
```

- `WEB_APP_URL`:

```bash
WEB_APP_URL=http://localhost:4321
```

- `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ACCOUNT_ID`, `R2_PUBLIC_DOMAIN` and `R2_ENDPOINT`:

You can those by creating a free cloudflare account and a Cloudflare R2 bucket

## Development

```bash
npm run dev
```

## Deployment

The API is currently deployed on [api.friedrichwt.dev](https://api.friedrichwt.dev).

## Containerization

To dockerize the application, you need to place yourself at the root of the monorepo, then

```bash
docker build -t me-api -f apps/api/Dockerfile --progress=plain .
```

And to run a container called `me-api-container` :

```bash
docker run -p 3000:3000 --name me-api-container --env-file apps/api/.env me-api:latest
```

## License

[MIT](/LICENSE) License &copy; 2025
