import { TaskCard } from "@/entities/task/ui/TaskCard";
import { Task } from "@/entities/task/model/types";
import { ClipboardList } from "lucide-react";

interface TasksListProps {
  tasks: Task[];
  isOwner: boolean;
  snapshot: any;
  onEdit?: (task: Task) => void;
}

export const TasksList = ({
  tasks,
  isOwner,
  snapshot,
  onEdit,
}: TasksListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="w-full py-8 flex flex-col items-center justify-center gap-2 border border-dashed border-font-muted/20 rounded-xl text-font-muted/50 h-[400px]">
        <ClipboardList size={24} />
        <span className="text-sm">
          {isOwner ? "Создайте свою первую задачу" : "Задач пока нет"}
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[400px] flex flex-col gap-2.5 overflow-y-auto pr-2 transition-all
        [scrollbar-width:thin]
        [scrollbar-color:rgba(var(--color-font-muted-rgb,163,163,163),0.1)_transparent]
        hover:[scrollbar-color:rgba(var(--color-accent-rgb,59,130,246),0.3)_transparent]
        
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-font-muted/10
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-accent/30
        [&::-webkit-scrollbar-thumb]:transition-colors"
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isOwner={isOwner}
          snapshot={snapshot}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
