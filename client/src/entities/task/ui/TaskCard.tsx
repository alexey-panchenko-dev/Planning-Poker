import { Task } from "../model/type";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div
      key={task.id}
      className="
            group p-5 rounded-2xl bg-card-bg border border-white/5 
            hover:border-accent/30 hover:bg-white/[0.03]
            transition-all duration-300
          "
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
    </div>
  );
};
