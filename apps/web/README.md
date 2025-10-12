<p align="center">
  <img width="200" height="200" alt="Friedrich WEKENON TOKPONTO's signature" src="https://github.com/user-attachments/assets/843cbb02-439c-468b-bcc6-101ff74cc17b" />
</p>

<h1 align="center">me Web</h1>
<p align="center">My personal website, portfolio and blog<br/>
<a href="https://friedrichwt.dev">friedrichwt.dev</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-05df72" >  
  <img src="https://img.shields.io/badge/LICENSE-MIT-05df72">
</p>

## Description

This project is my personal website, portfolio and blog, all in one place.
It is built on top of [Astro](https://astro.build/) and powered by [tRPC](https://trpc.io/).

## Project setup

To run the website, you need to first clone the repository

```bash
git clone https://github.com/Friedrich482/me.git
```

Then `cd` in the web site folder

```bash
cd apps/web
```
Then install dependencies

```bash
npm install
```

### Development

Before continuing you'll need some environment variables.
Create a `.env.development` :

```bash
PUBLIC_API_URL=http://localhost:3010/trpc
```

So to properly run the dashboard in development, the [API](../api) must be also running. Then run

```bash
npm run dev
```

and open [http://localhost:4321](http://localhost:4321).

### Production

To build for production:
Create a `.env.production`:

```bash
PUBLIC_API_URL=...
```

Then build with:

```bash
npm run build
```

## Containerization

To dockerize the application, you need to place yourself at the root of the monorepo, then

```bash
docker build -t me-web -f apps/web/Dockerfile --progress=plain .
```

And to run a container called `me-web-container` :

```bash
docker run -p 4322:4322 --name me-web-container --env-file apps/web/.env.production me-web:latest
```

## License

[MIT](/LICENSE) License &copy; 2025

