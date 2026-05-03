import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinRoomByInvitation } from "@/entities/room/api/room.api";

export const useJoinRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinRoomByInvitation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      queryClient.setQueryData(["room", data.room.id], data);
    },
  });
};
