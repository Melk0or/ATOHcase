import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const querClient = new QueryClient();

const router = createRouter({routeTree})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={querClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
