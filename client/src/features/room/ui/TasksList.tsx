import { Task } from "@/entities/task/model/type";
import { TaskCard } from "@/entities/task/ui/TaskCard";

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-font-muted italic py-10 border-2 border-dashed border-white/5 rounded-3xl text-center">
        Задач пока нет...
      </div>
    );
  }

  return (
    <div
      className="
        pr-4 
        max-h-[300px] max-w-[500px]
        overflow-y-auto 
        flex flex-col gap-3
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-accent/50
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-accent/60
        [scrollbar-width:thin]
        [scrollbar-color:theme(colors.accent/50%)_transparent]
        transition-all
      "
    >
      {tasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </div>
  );
};
