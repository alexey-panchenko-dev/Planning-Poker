import { createBrowserRouter, Outlet } from "react-router"; // Добавили Outlet

import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { Header } from "@/widgets/Header";

const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
      {
        path: "/rooms",
        element: <div>rooms</div>,
      },
    ],
  },
]);
