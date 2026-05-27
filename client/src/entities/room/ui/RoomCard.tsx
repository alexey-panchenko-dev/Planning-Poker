import { useState } from "react";
import { IRoom } from "../model/types";
import { Button, Modal } from "@/shared";
import { Link } from "react-router-dom";
import { Users, ArrowRight, Trash2, AlertTriangle } from "lucide-react";
import { useDeleteRoom } from "@/features/rooms/model/useDeleteRoom";

export const RoomCard = ({
  id,
  name,
  description,
  active_task_title,
  participants_count,
}: IRoom) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: deleteRoom, isPending } = useDeleteRoom();

  const handleDelete = (e: any) => {
    e.preventDefault();
    deleteRoom(id, {
      onSuccess: () => setIsDeleteModalOpen(false),
    });
  };

  return (
    <>
      <div className="group relative flex flex-col bg-card-bg border border-font-muted/10 p-6 rounded-[24px] transition-all duration-300 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xl font-bold text-font-main group-hover:text-accent transition-colors tracking-tight">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-font-muted">
              <Users size={14} className="text-ghost" />
              <span className="text-xs font-medium">
                {participants_count} участников
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-font-muted text-sm leading-relaxed line-clamp-3 mb-6">
            {description || "Для этой комнаты еще не задано описание сессии..."}
          </p>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-font-muted/5">
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(true);
              }}
              variant="danger"
              className="rounded-xl p-2.5"
              value={<Trash2 size={18} />}
            />

            <Link to={`/rooms/${id}`} className="block">
              <Button
                value={
                  <span className="flex items-center gap-2">
                    Войти <ArrowRight size={16} />
                  </span>
                }
                className="rounded-xl px-5 py-2.5 text-sm"
              />
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[24px] bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Удаление комнаты"
      >
        <form onSubmit={handleDelete}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <p className="text-font-main font-medium text-lg">
                Вы уверены, что хотите удалить комнату "{name}"?
              </p>
              <p className="text-font-muted text-sm leading-relaxed">
                Это действие необратимо. Все задачи и история голосований будут
                удалены навсегда.
              </p>
            </div>

            <div className="flex gap-3 w-full mt-4">
              <Button
                value="Отмена"
                variant="ghost"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 rounded-2xl"
              />
              <Button
                value={isPending ? "Удаление..." : "Удалить"}
                variant="danger"
                type="submit"
                className="flex-1 rounded-2xl"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
