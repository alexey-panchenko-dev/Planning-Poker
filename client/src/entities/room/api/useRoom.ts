import { useQuery } from "@tanstack/react-query";
import { getRoom } from "@/features/rooms/model/roomsApi";

export const useRoom = (id?: string) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id!),
    enabled: !!id,
    staleTime: 5000,
  });
};
