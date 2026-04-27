import { Input, Button } from "@/shared";
import { useTaskOperations, useTaskForm } from "../model/tasks.hooks";

export const CreateTaskForm = ({ roomId }: { roomId: string }) => {
  const { create } = useTaskOperations(roomId);
  const { values, handleChange, setValues } = useTaskForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim()) return;

    create.mutate(
      { ...values, position: 0 },
      {
        onSuccess: () => {
          setValues({ title: "", description: "" });
        },
      },
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 p-2 bg-card-bg rounded-2xl border border-white/5 shadow-2xl"
    >
      <Input
        name="title"
        placeholder="Название новой задачи..."
        value={values.title}
        onChange={handleChange}
      />
      <Input
        name="description"
        placeholder="Опишите задачу..."
        value={values.description}
        onChange={handleChange}
      />
      <Button
        type="submit"
        value={create.isPending ? "Создание..." : "Создать"}
        disabled={create.isPending}
      />
    </form>
  );
};
