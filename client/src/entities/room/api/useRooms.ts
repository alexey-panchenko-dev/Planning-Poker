import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/features/rooms/model/roomsApi";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
    staleTime: 5000,
  });
};
