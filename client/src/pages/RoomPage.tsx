import { useParams } from "react-router-dom";
import { useRoom } from "@/entities/room/model/useRoom";
import { CreateTaskForm } from "@/features/task";
import { TasksList } from "@/features/room";
import { GuardQuery } from "@/app/Guard/GuardQuery";
import { SelectedCard } from "@/entities/room/ui/SelectedCard";
import { useRoomStore } from "@/entities/room/model/useRoomStore";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading, error } = useRoom(id);
  const isVotingMode = useRoomStore((state) => state.isVotingMode);

  return (
    <GuardQuery isLoading={isLoading} error={error}>
      <div className="flex flex-col min-h-screen text-font-main bg-background ">
        <main className="flex-1 mt-12 px-6 md:px-16 pb-60">
          <header className="mb-14 max-w-4xl">
            <h1 className="text-4xl font-black tracking-tighter text-font-main leading-none mb-4">
              {snapshot?.room.name}
            </h1>
            {snapshot?.room.description && (
              <p className="text-font-muted text-xl leading-relaxed max-w-2xl font-light opacity-80">
                {snapshot.room.description}
              </p>
            )}
          </header>

          <section className="w-full flex gap-10 items-start card-bg border border-font-muted/10 rounded-2xl">
            <div className="w-full max-w-2xl  min-h-[650px] rounded-2xl p-10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] " />

              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-4 bg-accent rounded-full" />
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-font-muted font-black">
                    Новая задача
                  </h2>
                </div>
                <CreateTaskForm roomId={id!} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-4 bg-font-muted/30 rounded-full" />
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-font-muted font-black">
                    Бэклог комнаты
                  </h2>
                </div>
                <TasksList tasks={snapshot?.tasks || []} />
              </div>
            </div>

            <div className="flex-1 self-stretch min-h-[650px]">
              <SelectedCard
                tasks={snapshot?.tasks || []}
                availableCards={snapshot?.room.deck.cards || []}
              />
            </div>
          </section>
        </main>

        <div
          className={`fixed bottom-0 left-0 w-full z-10 transition-all duration-500 ${
            isVotingMode
              ? "translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        ></div>
      </div>
    </GuardQuery>
  );
};
