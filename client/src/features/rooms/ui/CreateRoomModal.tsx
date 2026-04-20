import { useState } from "react";
import { useCreateRoom } from "@/features/rooms/model/useCreateRoom";
import { Button, Input } from "@/shared";

export const CreateRoomModal = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateRoom();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, description, deck_preset_code: "fibonacci" },
      {
        onSuccess: () => {
          onClose();
          setName("");
          setDescription("");
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-main-bg/40 backdrop-blur-md flex items-center justify-center z-[100] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card-bg p-8 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-font-main mb-6">
          Создать комнату
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Название"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="Введите название комнаты..."
          />

          <Input
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="О чем эта комната?"
          />

          <div className="flex gap-3 mt-2">
            <Button
              value="Отмена"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            />
            <Button
              type="submit"
              value={isPending ? "Создание..." : "Создать комнату"}
              variant="accent"
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
