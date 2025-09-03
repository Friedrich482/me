import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";
import NotFound from "./components/404/NotFound";
import CreatePost from "./components/create/CreatePost";
import EditPost from "./components/edit/EditPost";
import Layout from "./components/layout/Layout";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Root from "./components/root/Root";

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
          },
          {
            element: <Posts />,
            path: "/posts",
          },
          {
            element: <Post />,
            path: "/posts/:slug",
          },
          {
            element: <EditPost />,
            path: "/posts/:slug/edit",
          },
          {
            element: <CreatePost />,
            path: "/create",
          },
          {
            element: <NotFound />,
            path: "*",
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
