import { Task } from "../model/types";
import { DeleteTaskBtn } from "@/features/task/ui/DeleteTaskBtn";
import { Button } from "@/shared";
import { SquareDashed } from "lucide-react";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { useDraggable } from "@dnd-kit/core";
import { GripHorizontal } from "lucide-react";

interface TaskCardProps {
  task: Task;
  isSelected?: boolean;
  isOwner: boolean;
}

const TaskCard = ({ task, isOwner }: TaskCardProps) => {
  const isCurrent = useSelectedTaskStore(
    (state) => state.selectedTask === task.id,
  );

  const setSelectedTaskId = useSelectedTaskStore(
    (state) => state.setSelectedTaskId,
  );

  // атрибуты вешаются на то что мы перетаскиваем что бы это лучше читалось браузером
  // листенерс вешаются на то за что нужно перетаскивать элемент
  // сетнодреф вешается на главный див что бы выставить размеры и тд
  // трансформ отвечает за утилиту CSS и дает координаты что бы их можно было отрисовывать
  // ис драгинг это флаг который говорит когда карточка удерживается а когда лежит на месте, в основном тоже для визуала
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative w-full text-left group p-5 rounded-2xl bg-card-bg border transition-all duration-300  ${
        isDragging
          ? "opacity-20 border-dashed border-accent/40 scale-95 "
          : isCurrent
            ? "border-accent shadow-md shadow-accent/5"
            : "border-font-muted/10"
      }`}
    >
      <div
        // за эту иконку можно будет перетаскивать всю карточку
        {...listeners}
        {...attributes}
        className="flex items-center justify-center gap-0.5 w-full mb-3 cursor-grab active:cursor-grabbing"
      >
        <GripHorizontal
          size={20}
          className="text-font-muted/30 group-hover:text-font-muted/60 transition-colors"
        />
      </div>
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
        <div className="mt-4 grid grid-cols-2 items-center gap-2">
          <DeleteTaskBtn taskId={task.id} />
          <Button
            onClick={() => setSelectedTaskId(task.id)}
            className="rounded-xl p-2.5"
            variant={isCurrent ? "accent" : "ghost"}
            value={<SquareDashed size={18} />}
          />
        </div>
      ) : (
        <div className="mt-4">
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

export { TaskCard };
