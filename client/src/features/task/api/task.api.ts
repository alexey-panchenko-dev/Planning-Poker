import { apiInstance } from "@/shared/api/base";

export const createTask = async (data: any, roomId: string) => {
  return await apiInstance.post(`/rooms/${roomId}/tasks`, data);
};

export const deleteTask = async (roomId: string, taskId: string) => {
  return await apiInstance.delete(`/rooms/${roomId}/tasks/${taskId}`);
};
