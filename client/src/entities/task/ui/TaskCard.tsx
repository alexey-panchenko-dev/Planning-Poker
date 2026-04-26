import { Button } from "@/shared";
import { Task } from "../model/types";
import { Trash2 } from "lucide-react";
import { DeleteTaskBtn } from "@/features/task/delete/ui/DeleteTaskBtn";

interface TaskCardProps {
  task: Task;
  onClick: (id: string) => void;
  isSelected?: boolean;
}

export const TaskCard = ({ task, onClick, isSelected }: TaskCardProps) => {
  return (
    <button
      onClick={() => onClick(task.id)}
      className={`
        relative w-full text-left
        group p-5 rounded-2xl bg-card-bg border 
        ${isSelected ? "border-accent shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "border-white/5"}
        hover:border-accent/30 hover:bg-white/[0.03]
        transition-all duration-300
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-font-main group-hover:text-accent transition-colors">
          {task.title}
        </h4>
      </div>

      {task.description && (
        <p className="text-sm text-font-muted line-clamp-2 italic">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          <div
            className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-accent" : "bg-ghost/30"}`}
          />
          <span className="text-[10px] uppercase tracking-widest text-font-muted font-bold">
            {isSelected ? "Выбрано" : "В списке"}
          </span>
        </div>
        <DeleteTaskBtn taskId={task.id} />
      </div>
    </button>
  );
};
