import { createBrowserRouter, Link } from "react-router";

import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <div>dashboard</div>,
  },
  {
    path: "/room/:id",
    element: <div>room</div>,
  },
]);
