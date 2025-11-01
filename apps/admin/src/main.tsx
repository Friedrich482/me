import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";
import NotFound from "./components/404/NotFound";
import LoginForm from "./components/auth/login/LoginForm";
import CreatePost from "./components/create/CreatePost";
import EditPost from "./components/edit/EditPost";
import Layout from "./components/layout/Layout";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Root from "./components/root/Root";
import { authRouteLoader, protectedRouteLoader } from "./loaders/authLoader";
import { editPostLoader } from "./loaders/editPostLoader";
import { postLoader } from "./loaders/postLoader";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Root />,
            loader: protectedRouteLoader,
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
            loader: editPostLoader,
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
