import { apiInstance } from "@/shared/api/base";
import { RoomProps, RoomSnapshot, DeckPreset } from "../model/types";

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
