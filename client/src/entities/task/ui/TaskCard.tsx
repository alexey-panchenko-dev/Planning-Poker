import { useRoomStore } from "@/entities/room/model/useRoomStore";
import { Task } from "../model/types";
import { DeleteTaskBtn } from "@/features/task/ui/DeleteTaskBtn";
import { Button } from "@/shared";
import { SquareDashed } from "lucide-react";

interface TaskCardProps {
  task: Task;
  isSelected?: boolean;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const setSelectedTask = useRoomStore((state) => state.setSelectedTask);
  const selectedTask = useRoomStore((state) => state.selectedTask);

  return (
    <div
      className={`relative w-full text-left group p-5 rounded-2xl bg-card-bg transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-font-main transition-colors border-b border-accent/20 w-full pb-1">
          {task.title}
        </h4>
      </div>

      <p className="text-sm text-font-muted line-clamp-2 italic w-full pb-1 border-b border-font-muted/20">
        {task.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <DeleteTaskBtn taskId={task.id} />
        <Button
          onClick={() => {
            setSelectedTask(task.id);
            console.log(selectedTask);
          }}
          className="rounded-xl p-2.5"
          value={<SquareDashed size={18} />}
        />
      </div>
    </div>
  );
};
