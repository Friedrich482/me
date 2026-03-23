import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import {
  authRouteLoader,
  protectedRouteLoader,
} from "@/app/loaders/auth-loader";
import { postLoader } from "@/app/loaders/post-loader";
import { rootLoader } from "@/app/loaders/root-loader";
import { Layout } from "@/components/layout/layout";

import { App } from "./app";
import { Login } from "./pages/auth/login";
import { CreatePost } from "./pages/create-post/create-post";
import { EditPost } from "./pages/edit-post/edit-post";
import { NotFound } from "./pages/not-found/not-found";
import { Post } from "./pages/post/post";
import { Posts } from "./pages/posts/posts";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            loader: rootLoader,
          },
          {
            element: <Posts />,
            path: "/posts",
            loader: protectedRouteLoader,
          },
          {
            element: <Post />,
            path: "/posts/:slug",
            loader: postLoader,
          },
          {
            element: <EditPost />,
            path: "/posts/:slug/edit",
            loader: postLoader,
          },
          {
            element: <CreatePost />,
            path: "/create",
            loader: protectedRouteLoader,
          },
          {
            element: <NotFound />,
            path: "*",
          },
        ],
      },
      {
        element: <Login />,
        path: "/login",
        loader: authRouteLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
