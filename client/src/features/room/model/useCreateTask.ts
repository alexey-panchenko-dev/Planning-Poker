import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createTask } from "./taskApi";

export const useCreateTask = (roomId: string) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    position: 0,
  });

  const mutation = useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      position: number;
    }) => createTask(data, roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      setFormData({ title: "", description: "", position: 0 });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading: mutation.isPending,
  };
};
