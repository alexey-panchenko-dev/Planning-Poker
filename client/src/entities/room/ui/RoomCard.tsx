import { type RoomProps } from "../model/type";
import { Button } from "@/shared";
import { Link } from "react-router-dom";
import { Users, Target, ArrowRight } from "lucide-react";

export const RoomCard = ({
  id,
  name,
  description,
  active_task_title,
  participants_count,
}: RoomProps) => {
  return (
    <div className="group relative flex flex-col bg-card-bg border border-font-muted/10 p-6 rounded-[24px] transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-xl font-bold text-font-main group-hover:text-accent transition-colors tracking-tight">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-font-muted">
            <Users size={14} className="text-ghost" />
            <span className="text-xs font-medium">
              {participants_count} участников
            </span>
          </div>
        </div>

        {active_task_title && (
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {active_task_title}
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-font-muted text-sm leading-relaxed line-clamp-3 mb-6">
          {description || "Для этой комнаты еще не задано описание сессии..."}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-font-muted/5">
        <div className="flex flex-col">
          <span className="text-[10px] text-font-muted uppercase font-semibold">
            ID Сессии
          </span>
          <span className="text-xs text-font-main font-mono opacity-50">
            #{id.toString().slice(0, 8)}
          </span>
        </div>

        <Link to={`/rooms/${id}`} className="block">
          <Button
            value={
              <span className="flex items-center gap-2">
                Войти <ArrowRight size={16} />
              </span>
            }
            className="rounded-xl px-5 py-2.5 text-sm"
          />
        </Link>
      </div>

      <div className="absolute inset-0 rounded-[24px] bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};
