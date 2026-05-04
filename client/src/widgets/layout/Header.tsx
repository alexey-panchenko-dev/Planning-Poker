import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/shared";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { AccountCard } from "@/entities/session/ui/AccountCard";
import { ThemeToggle } from "@/features/theme/ui/ToggleTheme";

export const Header = () => {
  const isAuth = useSessionStore((state) => state.isAuth);
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-50 bg-main-bg/15 backdrop-blur-md border-b border-font-muted/10">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/Logo.svg" alt="IHP Logo" className="h-9" />
          </Link>
          <span className="text-xl font-bold text-font-main tracking-tight">
            Poker Planning
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!isAuth ? (
            <div className="flex items-center gap-3">
              <Link to="/auth" state={{ from: location, authType: "login" }}>
                <Button
                  value="Войти"
                  variant="ghost"
                  className="text-sm px-5"
                />
              </Link>
              <Link to="/auth" state={{ from: location, authType: "register" }}>
                <Button
                  value="Регистрация"
                  variant="accent"
                  className="text-sm px-5"
                />
              </Link>
            </div>
          ) : (
            <AccountCard />
          )}
        </div>
      </div>
    </header>
  );
};
