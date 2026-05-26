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
        <span className="text-[13px] uppercase tracking-widest text-font-muted/60">
          Задачи
        </span>
        {isOwner && (
          <Button
            onClick={() => setIsModal(true)}
            variant="accentLiner"
            value="+ Создать задачу"
          />
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
