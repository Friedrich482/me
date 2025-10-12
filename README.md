# My Personal Website and Blog

 <p align="center">
  <img width="200" height="200" alt="Moon" src="https://github.com/user-attachments/assets/843cbb02-439c-468b-bcc6-101ff74cc17b" />
</p>

<p align="center">My personal website (portfolio) and blog<br/>
<a href="https://friedrichwt.dev">friedrichwt.dev</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.0.1-05df72" >  
  <img src="https://img.shields.io/badge/LICENSE-MIT-05df72">
</p>

## Description

This project is the monorepo for my personal website, portfolio and blog.

## Features 🚀

- Description, personal projects and blog
- All my useful links in one single place
- Internal dashboard to manage all my blog posts
- Extensive markdown editor and visualizer for the blog posts
- Support for images (they are stored in a cloudflare bucket)

### Apps and Packages

- [`api`](./apps/api): a [Nestjs](https://nestjs.com/) application that powers the `web` and the `admin dashboard`
- [`admin dashboard`](./apps/admin): a [Vite](https://vite.dev/) dashboard that is used to manage all the blog posts
- [`web`](./apps/web): an [Astro](https://astro.build/) site that is my portfolio and personal blog in one place 
- [`@repo/common`](./packages/common): all functions, constants and utils shared by the three parts of the project
- [`@repo/trpc`](./packages/trpc): the package that shares trpc types across the project
- [`@repo/ui`](./packages/ui): ui components shared between `admin dashboard` and `web`

### Useful links

- The API is deployed on [api.friedrichwt.dev](https://api.friedrichwt.dev)
- The admin dashboard is deployed on [admin.friedrichwt.dev](https://admin.friedrichwt.dev)
- The website is deployed on [friedrichwt.dev](https://friedrichwt.dev)


### Develop

To start the dev server of all apps at the same time, run

```
> cd me
> turbo dev # or npm run dev
```
