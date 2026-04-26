import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api/room.api";

export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
    staleTime: 5000,
  });
};
