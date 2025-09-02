import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import Root from "./components/root/Root";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import CreatePost from "./components/create/CreatePost";

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
            element: <CreatePost />,
            path: "/create",
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
