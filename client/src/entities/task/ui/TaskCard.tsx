import { Task } from "../model/types";
import { DeleteTaskBtn } from "@/features/task/ui/DeleteTaskBtn";
import { Button } from "@/shared";
import { SquareDashed, GripHorizontal } from "lucide-react";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { useDraggable } from "@dnd-kit/core";
import { memo } from "react";

interface TaskCardProps {
  task: Task;
  isSelected?: boolean;
  isOwner: boolean;
}

const TaskCard = memo(({ task, isOwner }: TaskCardProps) => {
  const isCurrent = useSelectedTaskStore(
    (state) => state.selectedTask === task.id,
  );

  const setSelectedTaskId = useSelectedTaskStore(
    (state) => state.setSelectedTaskId,
  );

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative w-full text-left group p-5 rounded-2xl bg-card-bg border transition-all duration-300 will-change-transform ${
        isDragging
          ? "opacity-30 border-dashed border-accent/60 scale-[0.98] shadow-inner"
          : isCurrent
            ? "border-accent shadow-lg shadow-accent/10"
            : "border-font-muted/10 hover:border-accent/40 hover:shadow-md"
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        className="absolute top-4 right-4 p-1 cursor-grab active:cursor-grabbing text-font-muted/20 hover:text-accent transition-colors rounded-md hover:bg-accent/5"
      >
        <GripHorizontal size={18} />
      </div>

      <div className="flex justify-between items-center mb-2 pr-8">
        <h4 className="font-bold text-font-main transition-colors border-b border-accent/20 w-full pb-1 truncate">
          {task.title}
        </h4>
        {task.estimate_value && (
          <div className="ml-2 text-xs border border-accent/30 px-2 py-0.5 rounded-lg bg-accent/5">
            <span className="text-accent font-bold">{task.estimate_value}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-font-muted line-clamp-2 italic w-full pb-1 border-b border-font-muted/10">
        {task.description || "Без описания"}
      </p>

      <div
        className={`mt-4 grid ${isOwner ? "grid-cols-2" : "grid-cols-1"} items-center gap-2`}
      >
        {isOwner && <DeleteTaskBtn taskId={task.id} />}
        <Button
          onClick={() => setSelectedTaskId(task.id)}
          className={`rounded-xl p-2.5 ${!isOwner ? "w-full" : ""}`}
          variant={isCurrent ? "accent" : "ghost"}
          value={<SquareDashed size={18} />}
        />
      </div>
    </div>
  );
});

export { TaskCard };
