import { CreateTaskForm } from "@/features/task";
import { TasksList } from "@/features/room";

import { Modal, Button } from "@/shared";
import { useState } from "react";

export const Tasks = ({ snapshot }: any) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      <div className="space-y-3">
        <Button
          onClick={() => setIsModal(true)}
          variant="accent"
          value="Создать задачу"
        />

        <TasksList tasks={snapshot.tasks} />
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
