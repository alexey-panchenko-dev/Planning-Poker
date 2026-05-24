// CreateTaskForm.tsx
import { Input, Button } from "@/shared";
import { useTaskOperations, useTaskForm } from "../model/tasks.hooks";
import { useState } from "react";

interface FormErrors {
  title?: string;
  description?: string;
}

export const CreateTaskForm = ({
  roomId,
  onSuccess,
}: {
  roomId: string;
  onSuccess?: () => void;
}) => {
  const { create } = useTaskOperations(roomId);
  const { values, handleChange, setValues } = useTaskForm();
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.title.trim()) {
      newErrors.title = "Название обязательно";
    } else if (values.title.trim().length < 3) {
      newErrors.title = "Минимум 3 символа";
    } else if (values.title.length > 100) {
      newErrors.title = "Максимум 100 символов";
    }
    if (values.description.length > 500) {
      newErrors.description = "Максимум 500 символов";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleChange(e as React.ChangeEvent<HTMLInputElement>);
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    create.mutate(
      { ...values, position: 0 },
      {
        onSuccess: () => {
          setValues({ title: "", description: "" });
          setErrors({});
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input
        label="Название"
        name="title"
        placeholder="Название новой задачи..."
        value={values.title}
        onChange={
          handleFieldChange as React.ChangeEventHandler<HTMLInputElement>
        }
        error={errors.title}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] uppercase tracking-widest text-font-muted/60 ml-1">
            Описание
          </label>
          <span className="text-xs text-font-muted/40">
            {values.description.length}/500
          </span>
        </div>
        <textarea
          name="description"
          placeholder="Опишите задачу (необязательно)..."
          value={values.description}
          onChange={handleFieldChange}
          rows={4}
          className={`w-full py-3 px-4 rounded-xl outline-none text-font-main text-sm
            focus:ring-1 focus:ring-accent/50 transition-all border bg-main-bg resize-none
            ${errors.description ? "border-danger border-2" : "border-white/5"}`}
        />
        {errors.description && (
          <p className="text-xs text-danger ml-1">{errors.description}</p>
        )}
      </div>

      <Button
        type="submit"
        value={create.isPending ? "Создание..." : "Создать задачу"}
        disabled={create.isPending}
        className="mt-1 py-4"
      />
    </form>
  );
};
