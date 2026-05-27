import { createBrowserRouter, Outlet } from "react-router";

import { Header } from "@/widgets/layout/Header";
import { Footer } from "@/widgets/layout/Footer";

import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { RoomsPage } from "@/pages/RoomsPage";
import { RoomPage } from "@/pages/RoomPage";
import { InvitePage } from "@/pages/InvitePage";

import { GuardAuth } from "@/app/Guard/GuardAuth";

const Layout = () => (
  <>
    <Header />
    <main className="mt-15">
      <Outlet />
    </main>
    <Footer />
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
      {
        path: "/rooms/:id",
        element: (
          <GuardAuth>
            <RoomPage />
          </GuardAuth>
        ),
      },
      {
        path: "/invite/:token",
        element: (
          <GuardAuth>
            <InvitePage />
          </GuardAuth>
        ),
      },
    ],
  },
]);
