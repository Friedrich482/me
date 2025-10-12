<p align="center">
  <img width="200" height="200" alt="Friedrich WEKENON TOKPONTO's signature" src="https://github.com/user-attachments/assets/843cbb02-439c-468b-bcc6-101ff74cc17b" />
</p>

<h1 align="center">Me Admin Dashboard</h1>
<p align="center">The dashboard for my personal website, portfolio and blog<br/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-05df72" >  
  <img src="https://img.shields.io/badge/LICENSE-MIT-05df72">
</p>

## Description

This project is the admin dashboard used to manage the blog posts for my blog. Built on top of [Vite](https://vite.dev/) and powered by [tRPC](https://trpc.io/).

### Features
- Rich markdown editor to create and edit blog posts
- Support for images uploading (stored in a Cloudflare bucket)

## Project setup

To run the admin dashboard, you need to first clone the repository:

```bash
git clone https://github.com/Friedrich482/me.git
```

Then `cd` in the admin dashboard:

```bash
cd apps/admin
```

Then install dependencies:

```bash
npm install
```

### Development

Before continuing you'll need some environment variables.
Create a `.env.development` :

```bash
VITE_API_URL="http://localhost:3010/trpc"
```

So to properly run the dashboard in development, the [API](../api) must be also running. Then run

```bash
npm run dev
```

and open [http://localhost:5173](http://localhost:5173).

### Production

To build for production:
Create a `.env.production`:

```bash
VITE_API_URL=...
```

Then build with:

```bash
npm run build
```

## License

[MIT](/LICENSE) License &copy; 2025
