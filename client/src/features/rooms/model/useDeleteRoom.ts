import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../api/rooms.api";

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRoom(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },

    onError: (error) => {
      console.error("Ошибка при удалении комнаты:", error);
    },
  });
};
