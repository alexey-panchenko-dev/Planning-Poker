import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/shared";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { AccountCard } from "@/entities/session/ui/AccountCard";

export const Header = () => {
  const isAuth = useSessionStore((state) => state.isAuth);
  const location = useLocation();

  const navigation = [
    { id: 1, title: "Главная", path: "/" },
    { id: 2, title: "Комнаты", path: "/rooms" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-main-bg/15 backdrop-blur-md border-b border-font-muted/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-3 items-center px-6 py-3">
        <div className="flex justify-start">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/Logo.svg" alt="IHP Logo" className="h-9" />
          </Link>
        </div>

        <nav className="flex justify-center items-center gap-2">
          {navigation.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "text-font-muted hover:text-font-main hover:bg-font-muted/5"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className="flex justify-end items-center gap-4">
          {!isAuth ? (
            <Link to="/auth" state={{ from: location }}>
              <Button value="Войти" variant="accentLiner" />
            </Link>
          ) : (
            <AccountCard />
          )}
        </div>
      </div>
    </header>
  );
};
