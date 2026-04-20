import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/shared";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { useShallow } from "zustand/react/shallow";

export const Header = () => {
  const { isAuth, logout } = useSessionStore(
    useShallow((state) => ({
      isAuth: state.isAuth,
      logout: state.logout,
    })),
  );

  const location = useLocation();

  const navigation = [
    { id: 1, title: "Главная", path: "/" },
    { id: 2, title: "Комнаты", path: "/rooms" },
  ];

  return (
    <header className="grid grid-cols-3 items-center px-15 py-5 bg-main-bg shadow-xl absolute top-0 w-full z-10">
      <div className="flex justify-start">
        <Link to="/">
          <img src="/Logo.svg" alt="IHP Logo" className="h-10" />
        </Link>
      </div>

      <nav className="flex justify-center gap-8 text-gray-400 font-medium">
        {navigation.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `pb-1 transition-all ${isActive ? "text-accent border-b-2 border-accent" : "text-font-muted"}`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>

      <div className="flex justify-end gap-2">
        {!isAuth ? (
          <Link to="/auth" state={{ from: location }}>
            <Button value="Войти" />
          </Link>
        ) : (
          <Button value="Выйти из аккаунта" variant="danger" onClick={logout} />
        )}
      </div>
    </header>
  );
};
