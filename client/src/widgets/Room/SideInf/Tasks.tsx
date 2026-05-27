import { CreateTaskForm } from "@/features/task";
import { TasksList } from "@/features/room";
import { Button } from "@/shared";
import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ITasks {
  snapshot: any;
  isOwner: boolean;
}

export const Tasks = ({ snapshot, isOwner }: ITasks) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50 ml-1">
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

      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-accent/10">
        <TasksList
          isOwner={isOwner}
          tasks={snapshot.tasks}
          snapshot={snapshot}
        />
      </div>

      {isModal &&
        createPortal(
          <div className="absolute inset-0 bg-main-bg z-50 p-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-font-main tracking-tight">
                Создать задачу
              </h2>
              <button
                onClick={() => setIsModal(false)}
                className="p-2 hover:bg-font-muted/10 rounded-full transition-colors text-font-muted cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-accent/20">
              <CreateTaskForm
                roomId={snapshot.room.id}
                onSuccess={() => setIsModal(false)}
              />
            </div>
          </div>,
          document.getElementById("side-inf-container")!,
        )}
    </div>
  );
};
