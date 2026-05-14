import { IRoomSnapshot } from "@/entities/room/model/types";
import { useSelectedTaskStore } from "../model/useSelectedTaskStore";
import { Actions } from "@/features/selectedTask/ui/Actions";

export const SelectedTask = ({
  snapshot,
  id,
}: {
  snapshot: IRoomSnapshot;
  id: string | undefined;
}) => {
  const selectedTaskId = useSelectedTaskStore((state) => state.selectedTaskId);
  const currentTask = snapshot?.tasks?.find(
    (t: any) => t.id === selectedTaskId,
  );

  if (!currentTask) {
    return (
      <div className="flex-1 h-200 w-full p-5 border border-font-main/20 bg-card-bg rounded-xl flex flex-col gap-4 justify-center">
        <span className="text-font-muted text-center">
          Выберите задачу для просмотра деталей
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full p-5 border border-font-main/20 bg-card-bg rounded-xl flex flex-col gap-4 h-full justify-center">
      <h1 className="text-2xl text-font-main font-bold leading-tight">
        {currentTask.title}
      </h1>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <h4 className="text-xs text-font-muted uppercase tracking-widest font-semibold">
          Описание
        </h4>
        <p className="text-font-main leading-relaxed overflow-y-auto flex-1">
          {currentTask.description || (
            <span className="text-font-muted italic">Описание отсутствует</span>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between">
        {currentTask.estimate_value && (
          <div className="text-sm border border-accent/30 px-3 py-1 rounded-lg">
            <span className="text-font-muted">Текущая оценка: </span>
            <span className="text-accent font-bold">
              {currentTask.estimate_value}
            </span>
          </div>
        )}
      </div>
      <Actions id={id} />
    </div>
  );
};
