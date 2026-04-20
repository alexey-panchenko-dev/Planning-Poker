import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "@/features/rooms/model/roomsApi";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
