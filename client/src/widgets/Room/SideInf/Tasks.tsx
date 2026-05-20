import { CreateTaskForm } from "@/features/task";
import { TasksList } from "@/features/room";

import { Modal, Button } from "@/shared";
import { useState } from "react";

interface ITasks {
  snapshot: any;
  isOwner: boolean;
}

export const Tasks = ({ snapshot, isOwner }: ITasks) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      <div className="space-y-3">
        {isOwner && (
          <Button
            onClick={() => setIsModal(true)}
            variant="accentLiner"
            value="Создать задачу"
            className="w-full"
          />
        )}

        <TasksList
          isOwner={isOwner}
          tasks={snapshot.tasks}
          snapshot={snapshot}
        />
      </div>

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
