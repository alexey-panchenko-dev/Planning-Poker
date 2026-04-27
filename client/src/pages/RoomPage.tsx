import { useParams } from "react-router-dom";
import { useRoom } from "@/entities/room/model/useRoom";
import { CreateTaskForm } from "@/features/task";
import { TasksList } from "@/features/room";
import { Cards } from "@/widgets/Room/Cards";
import { GuardQuery } from "@/app/Guard/GuardQuery";
import { useState } from "react";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading, error } = useRoom(id);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  return (
    <GuardQuery isLoading={isLoading} error={error}>
      <div className="flex flex-col min-h-screen text-font-main">
        <main className="flex-1 mt-10 px-6 md:px-16 pb-52">
          <header className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-font-main">
              {snapshot?.room.name}
            </h1>
            {snapshot?.room.description && (
              <p className="text-font-muted mt-2 text-lg leading-relaxed">
                {snapshot.room.description}
              </p>
            )}
          </header>

          <section className="max-w-2xl">
            <div className="mb-12">
              <h2 className="text-sm uppercase tracking-[0.2em] text-font-muted mb-4 font-bold">
                Новая задача
              </h2>
              <CreateTaskForm roomId={id!} />
            </div>

            <div className="mt-12">
              <h2 className="text-sm uppercase tracking-[0.2em] text-font-muted mb-4 font-bold text-accent">
                Бэклог комнаты
              </h2>
              <TasksList
                tasks={snapshot?.tasks || []}
                editingTaskId={editingTaskId}
                onEditStart={setEditingTaskId}
                onEditEnd={() => setEditingTaskId(null)}
              />
            </div>
          </section>
        </main>

        <Cards cards={snapshot?.room.deck.cards || []} />
      </div>
    </GuardQuery>
  );
};
