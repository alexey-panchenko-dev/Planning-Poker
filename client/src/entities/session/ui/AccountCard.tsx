import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useSessionStore } from "../model/useSessionStore";
import { useShallow } from "zustand/react/shallow";

export const AccountCard = () => {
  const { user, logout } = useSessionStore(
    useShallow((state) => ({ user: state.user, logout: state.logout })),
  );
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-3 px-4 py-2 border rounded-full transition-all duration-200 
          ${isOpen ? "border-accent bg-accent/10" : "border-font-muted/30 hover:border-accent"}`}
      >
        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs text-white font-bold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="text-font-main font-medium max-w-[100px] truncate">
          {user?.name}
        </span>
        <ChevronDown
          size={16}
          className={`text-font-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-main-bg border border-font-muted/20 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-150">
          <div className="px-4 py-2 border-b border-font-muted/10 mb-1">
            <p className="text-[10px] uppercase tracking-wider text-font-muted">
              Аккаунт
            </p>
            <p className="text-sm font-medium text-font-main truncate">
              {user?.email || user?.name}
            </p>
          </div>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-font-main hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <User size={16} />
            Профиль
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};
