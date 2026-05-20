import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/shared";
import { useSessionStore } from "../../entities/session/model/useSessionStore";

interface AuthGuardProps {
  children: ReactNode;
}

export const GuardAuth = ({ children }: AuthGuardProps) => {
  const isAuth = useSessionStore((state) => state.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-main-bg p-4 relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 bg-card-bg/60 backdrop-blur-xl p-8 md:p-12 flex flex-col items-center justify-center gap-6 rounded-3xl border border-font-muted/10 max-w-md w-full text-center shadow-2xl transition-all duration-500">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 text-accent mb-2 animate-pulse">
            <ShieldAlert size={32} strokeWidth={1.5} />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-black text-font-main tracking-tight uppercase">
              Доступ ограничен
            </h1>
            <p className="text-base text-font-muted font-light leading-relaxed">
              Пройдите авторизацию, чтобы получить доступ к этой комнате и
              возможностям нашего сервиса
            </p>
          </div>

          <Link to="/auth" state={{ from: location }} className="w-full mt-2">
            <Button
              className="w-full py-3.5 uppercase text-[11px] tracking-[0.2em] font-black transition-all duration-300"
              value="Авторизоваться"
            />
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
