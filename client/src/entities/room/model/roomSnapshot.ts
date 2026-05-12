import { getRoom } from "../api/room.api";
import { useQuery } from "@tanstack/react-query";

export const roomSnapshot = (id: string | undefined) => {
  return useQuery({
    queryKey: ["roomSnapshot", id],
    queryFn: () => getRoom(id!),
    enabled: !!id,
    refetchOnWindowFocus: true,
  });
};
