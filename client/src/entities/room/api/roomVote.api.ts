import { apiInstance } from "@/shared/api/base";

//начать раунд и передать в него айди оцениваемого таска
export const startRound = async (roomId: string, taskId: string) => {
  return apiInstance.post(`/rooms/${roomId}/rounds/start`, taskId);
};

//каждый пользователь будет слать свою оценку в снапшот => votes
export const submitVote = async (
  roomId: string,
  roundId: string,
  value: string,
) => {
  return apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/vote`, { value });
};

//Статус раунда меняется на reveal, расчитывается средняя оценка задачи
export const revealRound = async (roomId: string, roundId: string) => {
  return apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/reveal`);
};

export const resetRound = async (roomId: string, roundId: string) => {
  return apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/reset`);
};

export const finalizeRound = async (roomId: string, roundId: string) => {
  return apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/finalize`);
};
