import { deleteTask } from "../../api/task.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = (roomId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(roomId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });

  const handleDelete = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    mutation.mutate(taskId);
  };

  return { handleDelete, isDeleting: mutation.isPending };
};
