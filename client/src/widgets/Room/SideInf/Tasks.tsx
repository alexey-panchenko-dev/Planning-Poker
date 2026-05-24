import { CreateTaskForm } from "@/features/task";
import { TasksList } from "@/features/room";
import { Modal, Button } from "@/shared";
import { useState } from "react";
import { Plus } from "lucide-react";

interface ITasks {
  snapshot: any;
  isOwner: boolean;
}

export const Tasks = ({ snapshot, isOwner }: ITasks) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-widest text-font-muted/60">
          Задачи
        </span>
        {isOwner && (
          <button
            onClick={() => setIsModal(true)}
            className="flex items-center gap-1.5 text-xs text-accent border border-accent/30 bg-accent/10 hover:bg-accent/20 hover:border-accent/60 px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            <Plus size={13} />
            Создать задачу
          </button>
        )}
      </div>

      <TasksList isOwner={isOwner} tasks={snapshot.tasks} snapshot={snapshot} />

      <Modal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        title="Создать задачу"
      >
        <CreateTaskForm
          roomId={snapshot.room.id}
          onSuccess={() => setIsModal(false)}
        />
      </Modal>
    </div>
  );
};
