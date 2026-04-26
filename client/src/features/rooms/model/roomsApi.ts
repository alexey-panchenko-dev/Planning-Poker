import { apiInstance } from "@/shared/api/base";
import { RoomProps } from "@/entities/room/model/type";
import { Task } from "@/entities/task/model/type";

export interface DeckPreset {
  id: string;
  name: string;
  code: string;
  description: string;
  cards: string[];
}

export interface RoomSnapshot {
  room: {
    id: string;
    name: string;
    description: string;
    deck: DeckPreset;
  };
  tasks: Task[];
}

export const getRooms = async () => {
  const response = await apiInstance.get("/rooms");
  return response.data as RoomProps[];
};

export const getRoom = async (id: string) => {
  const response = await apiInstance.get(`/rooms/${id}`);
  return response.data as RoomSnapshot;
};

export const getDeckPresets = async () => {
  const response = await apiInstance.get("/rooms/deck-presets");
  return response.data as DeckPreset[];
};

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
