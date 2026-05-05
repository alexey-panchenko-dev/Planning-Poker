import { Input, Button } from "@/shared";
import { useTaskOperations, useTaskForm } from "../model/tasks.hooks";

export const CreateTaskForm = ({
  roomId,
  onSuccess,
}: {
  roomId: string;
  onSuccess?: () => void;
}) => {
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
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase tracking-widest text-font-muted font-bold ml-2">Название</label>
        <Input
          name="title"
          placeholder="Название новой задачи..."
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[10px] uppercase tracking-widest text-font-muted font-bold ml-2">Описание</label>
        <Input
          name="description"
          placeholder="Опишите задачу (необязательно)..."
          value={values.description}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        value={create.isPending ? "Создание..." : "Создать задачу"}
        disabled={create.isPending}
        className="mt-2 py-4"
      />
    </form>
  );
};
