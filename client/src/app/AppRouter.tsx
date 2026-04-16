import { createBrowserRouter, Link } from "react-router";
import { LoginPage } from "@/pages/LoginPage";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Link className="bg-blue-500" to="auth">
          go to auth
        </Link>
        <div>homeScreen</div>
      </div>
    ),
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
