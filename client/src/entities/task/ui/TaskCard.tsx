import { Task } from "../model/types";
import { DeleteTaskBtn } from "@/features/task/ui/DeleteTaskBtn";
import { Button } from "@/shared";
import { SquareDashed, GripHorizontal } from "lucide-react";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { useDraggable } from "@dnd-kit/core";
import { memo } from "react";

interface TaskCardProps {
  task: Task;
  isOwner: boolean;
  snapshot: any;
}

const TaskCard = memo(({ task, isOwner, snapshot }: TaskCardProps) => {
  const isCurrent = useSelectedTaskStore(
    (state) => state.selectedTask === task.id,
  );
  const setSelectedTaskId = useSelectedTaskStore(
    (state) => state.setSelectedTaskId,
  );

  const isRoundActive = !!snapshot?.active_round;

  const isTaskInActiveRound =
    isRoundActive && snapshot.active_round.task_id === task.id;

  const isSelectionDisabled = isRoundActive && !isTaskInActiveRound;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    disabled: isSelectionDisabled,
  });

  const isDisabled = snapshot?.history.some((t: any) => t.task_id === task.id);

  return (
    <div
      ref={setNodeRef}
      className={`relative w-full text-left group px-4 py-3.5 rounded-xl border transition-all duration-300 will-change-transform
        ${
          isDragging
            ? "opacity-30 border-dashed border-accent/60 scale-[0.98]"
            : isCurrent
              ? "bg-accent/5 border-accent/50"
              : "bg-card-bg border-font-muted/10 hover:border-accent/30"
        }
        
        /* Визуально тушим карточки, которые нельзя выбрать/перетащить */
        ${isSelectionDisabled ? "opacity-40 cursor-not-allowed select-none" : ""}
      `}
      title={
        isSelectionDisabled
          ? "Нельзя выбрать другую задачу во время активного раунда"
          : ""
      }
    >
      {isOwner && !isSelectionDisabled && (
        <div
          {...listeners}
          {...attributes}
          className="absolute top-3.5 right-3.5 p-1 cursor-grab active:cursor-grabbing text-font-muted/20 hover:text-accent transition-colors rounded-md hover:bg-accent/5"
        >
          <GripHorizontal size={16} />
        </div>
      )}

      <div className="flex items-start gap-2 pr-7 mb-1.5">
        <h4 className="text-base font-medium text-font-main truncate flex-1">
          {task.title}
        </h4>
        {task.estimate_value && (
          <span className="shrink-0 text-sm border border-accent/30 px-2 py-0.5 rounded-lg bg-accent/5 text-accent font-medium">
            {task.estimate_value}
          </span>
        )}
      </div>

      <p className="text-sm text-font-muted/60 line-clamp-2 italic leading-relaxed mb-3">
        {task.description || "Без описания"}
      </p>

      <div className={`grid ${isOwner ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
        {isOwner && !isDisabled && !isRoundActive && (
          <DeleteTaskBtn taskId={task.id} />
        )}

        <Button
          onClick={() => setSelectedTaskId(task.id)}
          className={`rounded-xl p-2.5 ${!isOwner ? "w-full" : ""} ${isSelectionDisabled ? "pointer-events-none" : ""}`}
          variant={isCurrent ? "accent" : "ghost"}
          value={
            isTaskInActiveRound ? (
              <span className="text-xs font-bold uppercase tracking-wider px-2">
                В раунде
              </span>
            ) : (
              <SquareDashed size={16} />
            )
          }
          disabled={isSelectionDisabled}
        />
      </div>
    </div>
  );
});

export { TaskCard };
