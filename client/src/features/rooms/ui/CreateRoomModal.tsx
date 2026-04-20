import { useState } from "react";
import { useCreateRoom } from "@/features/rooms/model/useCreateRoom";

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

  // Сбрасываем поля после успешного создания
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f1117] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-xl font-bold text-white mb-6">Создать комнату</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название комнаты"
            required
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#00c38b]/50 transition-colors"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание (необязательно)"
            rows={3}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#00c38b]/50 transition-colors resize-none"
          />

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className="flex-1 py-3 bg-accent text-black font-bold rounded-xl disabled:opacity-50 hover:shadow-[0_0_15px_rgba(0,195,139,0.4)] transition-all"
            >
              {isPending ? "Создание..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
