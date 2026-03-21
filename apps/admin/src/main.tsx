import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { App } from "./App";
import { NotFound } from "./components/404/not-found";
import { LoginForm } from "./components/auth/login/login-form";
import { CreatePost } from "./components/create/create-post";
import { EditPost } from "./components/edit/edit-post";
import { Layout } from "./components/layout/layout";
import { Post } from "./components/post/post";
import { Posts } from "./components/posts/posts";
import { authRouteLoader, protectedRouteLoader } from "./loaders/auth-loader";
import { postLoader } from "./loaders/post-loader";
import { rootLoader } from "./loaders/root-loader";

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
        element: <LoginForm />,
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
