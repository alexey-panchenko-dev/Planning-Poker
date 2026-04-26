import { Input, Button } from "@/shared";
import { useCreateTask } from "../model/useCreateTask";

export const CreateTaskForm = ({ roomId }: { roomId: string }) => {
  const { handleChange, handleSubmit, formData } = useCreateTask(roomId);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-2 bg-card-bg rounded-2xl border border-white/5 shadow-2xl"
    >
      <Input
        name="title"
        placeholder="Название новой задачи..."
        value={formData.title}
        onChange={handleChange}
      />
      <Input
        name="description"
        placeholder="Опишите задачу..."
        value={formData.description}
        onChange={handleChange}
      />
      <Button type="submit" value="Создать" />
    </form>
  );
};
