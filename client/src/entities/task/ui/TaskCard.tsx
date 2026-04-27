import { useParams } from "react-router-dom";
import { Task } from "../model/types";
import { DeleteTaskBtn } from "@/features/task/ui/DeleteTaskBtn";
import { useTaskOperations } from "@/features/task/model/tasks.hooks";
import { useTaskForm } from "@/features/task/model/tasks.hooks";

interface TaskCardProps {
  task: Task;
  onClick: (id: string) => void;
  isSelected?: boolean;
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const TaskCard = ({
  task,
  onClick,
  isSelected,
  isEditing,
  onEditStart,
  onEditEnd,
}: TaskCardProps) => {
  console.log("TaskCard render:", task.id, "isEditing:", isEditing);

  const { id: roomId } = useParams<{ id: string }>();
  const { update } = useTaskOperations(roomId!);
  const { values, handleChange, setValues } = useTaskForm({
    title: task.title,
    description: task.description || "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    update.mutate(
      { taskId: task.id, data: values },
      { onSuccess: () => onEditEnd() },
    );
  };

  const handleCancel = () => {
    setValues({ title: task.title, description: task.description || "" });
    onEditEnd();
  };

  return (
    <div
      onClick={() => !isEditing && onClick(task.id)}
      className={`relative w-full text-left group p-5 rounded-2xl bg-card-bg border transition-all duration-300
        ${isSelected ? "border-accent shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "border-white/5"}
        ${!isEditing && "hover:border-accent/30 hover:bg-white/[0.03] cursor-pointer"}
      `}
    >
      <form onSubmit={handleSave} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-2">
          {isEditing ? (
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              className="font-bold text-font-main transition-colors border-b border-accent/40 w-full focus:outline-none focus:border-accent/70 pb-1"
              autoFocus
            />
          ) : (
            <h4 className="font-bold text-font-main transition-colors border-b border-accent/20 w-full pb-1">
              {task.title}
            </h4>
          )}
        </div>

        {isEditing ? (
          <input
            name="description"
            value={values.description}
            onChange={handleChange}
            className="text-sm text-font-muted line-clamp-2 italic border-b border-white/10 w-full focus:outline-none focus:border-font-muted/70 pb-1"
          />
        ) : (
          task.description && (
            <p className="text-sm text-font-muted line-clamp-2 italic w-full pb-1 border-b border-font-muted/20">
              {task.description}
            </p>
          )
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={update.isPending}
                  className="text-[10px] text-accent font-bold uppercase cursor-pointer disabled:opacity-50"
                >
                  {update.isPending ? "..." : "Сохранить"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-[10px] text-red-400 font-bold uppercase cursor-pointer"
                >
                  Отмена
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onEditStart}
                className="text-[10px] text-font-muted hover:text-accent font-bold uppercase cursor-pointer"
              >
                Изменить
              </button>
            )}
          </div>
          <DeleteTaskBtn taskId={task.id} />
        </div>
      </form>
    </div>
  );
};
