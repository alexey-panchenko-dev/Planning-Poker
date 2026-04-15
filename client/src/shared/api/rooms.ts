import { apiInstance } from "./base";

export const getRooms = () => {
  return apiInstance.get("/rooms");
};

export const createRoom = (roomName: number) => {
  return apiInstance.post("/rooms", { name: roomName });
};

export const getRoomById = () => {
  return apiInstance.get(`/rooms/:{id}`);
};
