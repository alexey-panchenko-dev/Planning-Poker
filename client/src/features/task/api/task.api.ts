import { apiInstance } from "@/shared/api/base";

export const createTask = async (data: any, roomId: string) => {
  return await apiInstance.post(`/rooms/${roomId}/tasks`, data);
};

export const deleteTask = async (roomId: string, taskId: string) => {
  return await apiInstance.delete(`/rooms/${roomId}/tasks/${taskId}`);
};

export const updateTask = async (roomId: string, taskId: string, data: any) => {
  return await apiInstance.patch(`/rooms/${roomId}/tasks/${taskId}`, data);
};
