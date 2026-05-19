import { Task } from "../model/types";
import { DeleteTaskBtn } from "@/features/task/ui/DeleteTaskBtn";
import { Button } from "@/shared";
import { SquareDashed } from "lucide-react";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";

interface TaskCardProps {
  task: Task;
  isSelected?: boolean;
  isOwner: boolean;
}

export const TaskCard = ({ task, isOwner }: TaskCardProps) => {
  const setSelectedTaskId = useSelectedTaskStore(
    (state) => state.setSelectedTaskId,
  );
  const selectedTask = useSelectedTaskStore((state) => state.selectedTask);

  const isCurrent = selectedTask === task.id;

  return (
    <div
      className={`relative w-full text-left group p-5 rounded-2xl bg-card-bg transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-font-main transition-colors border-b border-accent/20 w-full pb-1">
          {task.title}
        </h4>
        {task.estimate_value && (
          <div className="text-sm border border-accent/30 px-3 py-1 rounded-lg">
            <span className="text-accent font-bold">{task.estimate_value}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-font-muted line-clamp-2 italic w-full pb-1 border-b border-font-muted/20">
        {task.description}
      </p>

      {isOwner ? (
        <div className="mt-4 grid grid-cols-2 flex items-center justify-between gap-2">
          <DeleteTaskBtn taskId={task.id} />

          <Button
            onClick={() => setSelectedTaskId(task.id)}
            className="rounded-xl p-2.5"
            variant={isCurrent ? "accent" : "ghost"}
            value={<SquareDashed size={18} />}
          />
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            onClick={() => setSelectedTaskId(task.id)}
            className="rounded-xl p-2.5 w-full"
            variant={isCurrent ? "accent" : "ghost"}
            value={<SquareDashed size={18} />}
          />
        </div>
      )}
    </div>
  );
};
