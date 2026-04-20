import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { AppRouter } from "./AppRouter";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const checkAuth = useSessionStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
      </QueryClientProvider>
    </>
  );
};

export default App;
