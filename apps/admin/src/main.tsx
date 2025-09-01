import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout.tsx";
import Root from "./components/root/Root.tsx";

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
