import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTask, deleteTask, updateTask } from "../api/task.api";

export const useTaskOperations = (roomId: string) => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["room", roomId] });

  const createMutation = useMutation({
    mutationFn: (data: any) => createTask(data, roomId),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(roomId, taskId),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: any }) =>
      updateTask(roomId, taskId, data),
    onSuccess: invalidate,
  });

  return {
    create: createMutation,
    remove: deleteMutation,
    update: updateMutation,
  };
};

export const useTaskForm = (initialData = { title: "", description: "" }) => {
  const [values, setValues] = useState(initialData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return { values, handleChange, setValues };
};
