import { Link } from "react-router-dom";
import { Button } from "@/shared";

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-6 bg-transparent absolute top-0 w-full z-10">
      <div className="flex items-center gap-12">
        <img src="/Logo.svg" alt="IHP Logo" className="h-8" />
        <nav className="flex gap-8 text-gray-400 font-medium">
          <Link
            to="/"
            className="text-[#00c38b] border-b-2 border-[#00c38b] pb-1"
          >
            Главная
          </Link>
          <Link to="/rooms" className="hover:text-white transition-colors">
            Комнаты
          </Link>
        </nav>
      </div>
      <Link to="/auth">
        <Button value="Войти" variant="primary" />
      </Link>
    </header>
  );
};
