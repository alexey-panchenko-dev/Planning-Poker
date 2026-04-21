import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronDown,
  User,
  LogOut,
  Link as LinkIcon,
  Check,
  Copy,
  LayoutGrid,
} from "lucide-react";
import { useSessionStore } from "../model/useSessionStore";
import { useShallow } from "zustand/react/shallow";
import { useRooms } from "@/entities/room/api/useRooms";

export const AccountCard = () => {
  const { user, logout } = useSessionStore(
    useShallow((state) => ({ user: state.user, logout: state.logout })),
  );
  const { id: roomId } = useParams<{ id: string }>();
  const { data: rooms } = useRooms();
  const currentRoom = rooms?.find((room) => String(room.id) === String(roomId));

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const handleCopyLink = () => {
    if (currentRoom?.invite_link) {
      navigator.clipboard.writeText(currentRoom.invite_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-3 px-4 py-2 border rounded-full transition-all duration-200 cursor-pointer
          ${isOpen ? "border-accent bg-accent/10" : "border-font-muted/30 hover:border-accent"}`}
      >
        <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] text-white font-bold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="text-font-main text-sm font-medium max-w-[100px] truncate">
          {user?.name}
        </span>
        <ChevronDown
          size={14}
          className={`text-font-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card-bg border border-font-muted/20 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-150">
          <div className="px-4 py-2 border-b border-font-muted/10 mb-1">
            <p className="text-[10px] uppercase tracking-wider text-font-muted">
              Аккаунт
            </p>
            <p className="text-xs font-medium text-font-main truncate">
              {user?.email || "Пользователь"}
            </p>
          </div>

          {currentRoom && (
            <div className="px-2 py-1">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm text-font-main hover:bg-accent/10 hover:text-accent rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LinkIcon size={14} />
                  <span>Ссылка в комнату</span>
                </div>

                {copied ? (
                  <Check size={14} className="text-accent" />
                ) : (
                  <Copy
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </button>
            </div>
          )}

          <div className="py-1">
            <Link
              to="/rooms"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-font-main hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <LayoutGrid size={14} />
              Мои комнаты
            </Link>

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-font-main hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <User size={14} />
              Профиль
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
            >
              <LogOut size={14} />
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
