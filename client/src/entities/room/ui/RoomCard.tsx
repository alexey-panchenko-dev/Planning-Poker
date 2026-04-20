import { type RoomProps } from "../model/type";
import { Button } from "@/shared";
import { Link } from "react-router-dom";

export const RoomCard = ({
  id,
  name,
  description,
  active_task_title,
  participants_count,
}: RoomProps) => {
  return (
    <div className="flex flex-col bg-card-bg p-6 rounded-xl gap-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-font-main">{name}</h3>
          <span className="text-xs text-font-muted">
            {participants_count} участников
          </span>
        </div>

        {active_task_title && (
          <span className="text-[10px] uppercase font-bold text-accent bg-accent/10 px-2 py-1 rounded">
            {active_task_title}
          </span>
        )}
      </div>

      <p className="text-font-muted text-sm line-clamp-2">
        {description || "Описание отсутствует"}
      </p>

      <Link to={`/rooms/${id}`}>
        <Button value="Присоединиться" />
      </Link>
    </div>
  );
};
