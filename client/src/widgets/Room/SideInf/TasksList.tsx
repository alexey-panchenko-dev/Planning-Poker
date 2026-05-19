import { TaskCard } from "@/entities/task/ui/TaskCard";
import { Task } from "@/entities/task/model/types";

interface TasksListProps {
  tasks: Task[];
  isOwner: boolean;
}

export const TasksList = ({ tasks, isOwner }: TasksListProps) => {
  if (tasks.length == 0) {
    return (
      <div className="w-full py-10 text-font-muted border-[0.3px] rounded-xl border-font-muted/20 flex justify-center">
        {isOwner ? "Создайте свою первую задачу!" : "Задач пока нет ("}
      </div>
    );
  }

  return (
    <div
      className="
      w-full max-h-[400px] 
      
      flex flex-col gap-3
      transition-all"
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} isOwner={isOwner} />
      ))}
    </div>
  );
};
