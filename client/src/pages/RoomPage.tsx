import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "@/entities/room/model/useRoom";
import { GuardQuery } from "@/app/Guard/GuardQuery";
import { SelectedCard } from "@/entities/room/ui/SelectedCard";
import { ParticipantsList } from "@/widgets/Room/ParticipantsList";
import { useRoomSocket } from "@/entities/room/model/useRoomSocket";
import { useRoomStore } from "@/entities/room/model/useRoomStore";
import { CreateTaskForm } from "@/features/task/ui/CreateTaskForm";
import { TasksList } from "@/features/room";
import { ShareRoomButton } from "@/features/rooms/ui/ShareRoomButton";
import { useMemo } from "react";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const setRoomSnapshot = useRoomStore((s) => s.setRoomSnapshot);

  const { data: snapshot, isLoading, error } = useRoom(id);

  const ownerName = useMemo(() => {
    if (!snapshot?.participants || !snapshot?.room.owner_id)
      return "Загрузка...";

    const owner = snapshot.participants.find(
      (p) => String(p.user_id) === String(snapshot.room.owner_id),
    );

    return owner?.name || "Владелец не найден";
  }, [snapshot?.participants, snapshot?.room.owner_id]);

  useEffect(() => {
    if (snapshot) {
      setRoomSnapshot(snapshot);
    }
  }, [snapshot, setRoomSnapshot]);

  useRoomSocket(id!);

  return (
    <GuardQuery isLoading={isLoading} error={error}>
      <div className="flex flex-col min-h-screen text-font-main bg-background">
        <ParticipantsList />

        <main className="flex-1 mt-12 px-6 md:px-16 pb-60">
          <header className="mb-14 max-w-4xl flex items-start justify-between gap-8">
            <div>
              <p>Владелец комнаты: {ownerName}</p>
              <h1 className="text-4xl font-black tracking-tighter text-font-main leading-none mb-4">
                {snapshot?.room.name}
              </h1>
              {snapshot?.room.description && (
                <p className="text-font-muted text-xl leading-relaxed max-w-2xl font-light opacity-80">
                  {snapshot.room.description}
                </p>
              )}
            </div>
            {snapshot?.room.invite_link && (
              <ShareRoomButton inviteLink={snapshot.room.invite_link} />
            )}
          </header>

          <section className="w-full flex gap-10 items-start card-bg border border-font-muted/10 rounded-2xl p-1">
            <div className="w-full max-w-2xl min-h-[650px] rounded-2xl p-10 backdrop-blur-md">
              <CreateTaskForm roomId={id!} />
              <div className="mt-12">
                <TasksList tasks={snapshot?.tasks || []} />
              </div>
            </div>

            <div className="flex-1 self-stretch min-h-[650px]">
              <SelectedCard
                roomId={id}
                roundId={snapshot?.active_round?.id}
                snapshot={snapshot}
                tasks={snapshot?.tasks || []}
                availableCards={snapshot?.room.deck.cards || []}
              />
            </div>
          </section>
        </main>
      </div>
    </GuardQuery>
  );
};
