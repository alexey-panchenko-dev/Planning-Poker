import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../api/rooms.api";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
