import { TaskCard } from "@/entities/task/ui/TaskCard";
import { motion } from "framer-motion";
import { Task } from "@/entities/task/model/types";

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
  if (tasks.length === 0)
    return (
      <div className="text-font-muted italic py-10 text-center">
        Задач пока нет...
      </div>
    );

  return (
    <div
      className="
        pr-4 
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
        transition-all
      "
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={(id) => console.log("Selected:", id)}
        />
      ))}
    </div>
  );
};
