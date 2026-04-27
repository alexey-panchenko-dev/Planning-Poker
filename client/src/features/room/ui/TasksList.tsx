import { TaskCard } from "@/entities/task/ui/TaskCard";
import { Task } from "@/entities/task/model/types";

interface TasksListProps {
  tasks: Task[];
  editingTaskId: string | null;
  onEditStart: (id: string) => void;
  onEditEnd: () => void;
}

export const TasksList = ({
  tasks,
  editingTaskId,
  onEditStart,
  onEditEnd,
}: TasksListProps) => {
  return (
    <div
      className="pr-4 
        max-h-[400px] 
        overflow-y-auto 
        flex flex-col gap-3
        /* Кастомизация скроллбара под твой Accent */
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-accent/40
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-accent
        [scrollbar-width:thin]
        [scrollbar-color:theme(colors.accent/40%)_transparent]
        transition-all"
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          onEditStart={() => onEditStart(task.id)}
          onEditEnd={onEditEnd}
          onClick={(id) => console.log("Selected:", id)}
        />
      ))}
    </div>
  );
};
