import { apiInstance } from "@/shared/api/base";
import { RoomProps } from "@/entities/room/model/type";

export const getRooms = async () => {
  const response = await apiInstance.get("/rooms");
  return response.data as RoomProps[];
};

export interface CreateRoomData {
  name: string;
  description: string;
  deck_preset_code: string;
}

export const createRoom = async (data: CreateRoomData) => {
  return await apiInstance.post("/rooms", data);
};
