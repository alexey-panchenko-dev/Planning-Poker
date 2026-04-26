import { apiInstance } from "@/shared/api/base";

export interface CreateRoomData {
  name: string;
  description: string;
  deck_preset_code: string;
}

export const createRoom = async (data: CreateRoomData) => {
  return await apiInstance.post("/rooms", data);
};

export const deleteRoom = async (id: string) => {
  return await apiInstance.delete(`/rooms/${id}`);
};
