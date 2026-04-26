import { useState, useEffect } from "react";
import { createTask } from "./taskApi";
import { getRoom } from "@/features/rooms/model/roomsApi";
import { Task } from "@/entities/task/model/type";

export const useTasks = (roomId: string) => {
  const [tasks, setTasks] = useState<Task[]>();

  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    position: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTaskFormData({
      ...taskFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("вы введли такие данные", taskFormData);
    createTask(taskFormData, roomId);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getRoom(roomId);
      setTasks(data.tasks);
    };
    if (roomId) fetchTasks();
  }, [roomId]);

  return { handleChange, handleSubmit, tasks };
};
