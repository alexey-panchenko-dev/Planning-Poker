import { createBrowserRouter, Outlet } from "react-router";

import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

import { LoginPage } from "@/pages/LoginPage";
import { HomePage } from "@/pages/HomePage";
import { RoomsPage } from "@/pages/RoomsPage";
import { RoomPage } from "@/pages/RoomPage";
import { ProfilePage } from "@/pages/ProfilePage";

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
        path: "/profile",
        element: (
          <GuardAuth>
            <ProfilePage />
          </GuardAuth>
        ),
      },
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
    ],
  },
]);
