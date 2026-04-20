import { createBrowserRouter, Outlet } from "react-router";

import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { Header } from "@/widgets/Header";
import { RoomsPage } from "@/pages/RoomsPage";
import { GuardAuth } from "@/entities/session/ui/GuardAuth";

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
      { path: "/", element: <HomePage /> },
      { path: "/auth", element: <LoginPage /> },
      {
        path: "/rooms",
        element: (
          <GuardAuth>
            <RoomsPage />
          </GuardAuth>
        ),
      },
      { path: "/room/:id", element: <div>room</div> },
    ],
  },
]);
