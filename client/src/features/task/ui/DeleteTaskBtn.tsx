import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useTaskOperations } from "../model/tasks.hooks";

export const DeleteTaskBtn = ({ taskId }: { taskId: string }) => {
  const { id: roomId } = useParams<{ id: string }>();
  const { remove } = useTaskOperations(roomId!);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    remove.mutate(taskId);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={remove.isPending}
      className="p-4 rounded-full bg-danger/40 text-font-main cursor-pointer hover:bg-danger/70 active:scale-95 transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
};
