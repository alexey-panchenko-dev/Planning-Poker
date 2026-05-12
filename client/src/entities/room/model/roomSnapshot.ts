import { getRoom } from "../api/room.api";
import { useQuery } from "@tanstack/react-query";

export const roomSnapshot = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ["roomSnapshot", roomId],
    queryFn: () => getRoom(roomId!),
    enabled: !!roomId,
    refetchOnWindowFocus: true,
  });
};
