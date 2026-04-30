import { useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useTaskOperations } from "../model/tasks.hooks";
import { Button } from "@/shared";

export const DeleteTaskBtn = ({ taskId }: { taskId: string }) => {
  const { id: roomId } = useParams<{ id: string }>();
  const { remove } = useTaskOperations(roomId!);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    remove.mutate(taskId);
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={remove.isPending}
      variant="danger"
      className="rounded-xl p-2.5"
      value={<Trash2 size={18} />}
    />
  );
};
