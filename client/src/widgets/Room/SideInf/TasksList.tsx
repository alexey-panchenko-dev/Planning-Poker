// TasksList.tsx
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { Task } from "@/entities/task/model/types";
import { ClipboardList } from "lucide-react";

interface TasksListProps {
  tasks: Task[];
  isOwner: boolean;
  snapshot: any;
}

export const TasksList = ({ tasks, isOwner, snapshot }: TasksListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="w-full py-8 flex flex-col items-center gap-2 border border-dashed border-font-muted/20 rounded-xl text-font-muted/50">
        <ClipboardList size={24} />
        <span className="text-sm">
          {isOwner ? "Создайте свою первую задачу" : "Задач пока нет"}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-h-[400px] flex flex-col gap-2.5 overflow-y-auto transition-all">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isOwner={isOwner}
          snapshot={snapshot}
        />
      ))}
    </div>
  );
};
