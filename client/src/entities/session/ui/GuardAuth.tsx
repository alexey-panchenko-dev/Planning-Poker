import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared";
import { useSessionStore } from "../model/useSessionStore";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export const GuardAuth = ({ children }: AuthGuardProps) => {
  const isAuth = useSessionStore((state) => state.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return (
      <div className="h-screen inset-0 flex items-center justify-center bg-main-bg/10">
        <div className="bg-card-bg p-8 flex flex-col items-center justify-center gap-5 rounded-xl">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-font-main">
              Упс! Кажется, вы не авторизованы
            </h1>
            <p className="text-xl text-font-muted">
              Пройдите авторизацию, чтобы пользоваться всеми возможностями
              нашего сервиса
            </p>
          </div>

          <Link to="/auth" state={{ from: location }}>
            <Button value="Авторизоваться" />
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
