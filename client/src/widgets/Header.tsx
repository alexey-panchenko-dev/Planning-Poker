import { Link } from "react-router-dom";
import { Button } from "@/shared";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const navigation = [
    { id: 1, title: "Главная", path: "/" },
    { id: 2, title: "Комнаты", path: "/rooms" },
  ];

  return (
    <header className="flex items-center justify-between px-15 py-4 bg-main-bg shadow-xl absolute top-0 w-full z-10">
      <img src="/Logo.svg" alt="IHP Logo" className="h-8" />
      <nav className="flex gap-8 text-gray-400 font-medium">
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

      <Link to="/auth">
        <Button value="Войти" />
      </Link>
    </header>
  );
};
