import { apiInstance } from "@/shared/api/base";
import { useQueryClient } from "@tanstack/react-query";

export const useRoomActions = (roomId: string | undefined) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["roomSnapshot", roomId] });
  };

  const start = async (taskId: string) => {
    if (!roomId) return;
    await apiInstance.post(`/rooms/${roomId}/rounds/start`, {
      task_id: taskId,
    });
    invalidate();
  };

  const vote = async (roundId: string, value: string) => {
    if (!roomId) return;
    await apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/vote`, {
      value,
    });
    invalidate();
  };

  const reveal = async (roundId: string) => {
    if (!roomId) return;
    await apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/reveal`);
    invalidate();
  };

  const reset = async (roundId: string) => {
    if (!roomId) return;
    await apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/reset`);
    invalidate();
  };

  const finalize = async (roundId: string, result_value: string | number) => {
    if (!roomId) return;
    await apiInstance.post(`/rooms/${roomId}/rounds/${roundId}/finalize`, {
      rezult_value: result_value,
    });
    invalidate();
  };

  return { start, vote, reveal, reset, finalize };
};
