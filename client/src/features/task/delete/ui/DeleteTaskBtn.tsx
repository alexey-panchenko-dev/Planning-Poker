import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useDeleteTask } from "../model/useDeleteTask";

export const DeleteTaskBtn = ({ taskId }: { taskId: string }) => {
  const { id: roomId } = useParams<{ id: string }>();
  const { handleDelete, isDeleting } = useDeleteTask(roomId!);

  return (
    <button
      // Передаем событие и ID
      onClick={(e) => handleDelete(e, taskId)}
      disabled={isDeleting}
      className="p-4 rounded-full bg-danger/40 text-danger hover:bg-danger/70 active:scale-95 transition-colors disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
};
