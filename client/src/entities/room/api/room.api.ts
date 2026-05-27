import { apiInstance } from "@/shared/api/base";

export const getRooms = async () => {
  const response = await apiInstance.get("/rooms");
  console.log(response.data);
  return response.data;
};

export const getRoom = async (id: string) => {
  const response = await apiInstance.get(`/rooms/${id}`);
  return response.data;
};

export const getDeckPresets = async () => {
  const response = await apiInstance.get("/rooms/deck-presets");
  return response.data;
};

export const joinRoomByInvitation = async (token: string) => {
  const response = await apiInstance.post(`/invitations/${token}/join`);
  return response.data;
};
