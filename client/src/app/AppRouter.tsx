import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/pages/LoginPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <div>homeScreen</div>,
  },
  {
    path: "/register",
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
