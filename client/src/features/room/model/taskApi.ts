import { apiInstance } from "@/shared/api/base";

export const createTask = async (data: any, roomId: string) => {
  return await apiInstance.post(`/rooms/${roomId}/tasks`, data);
};
