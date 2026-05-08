import { useState, useEffect, useMemo } from "react";
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
import { Modal, Button } from "@/shared";
import { Plus } from "lucide-react";
import { useSessionStore } from "@/entities/session/model/useSessionStore";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setRoomSnapshot = useRoomStore((s) => s.setRoomSnapshot);
  const user = useSessionStore((state) => state.user);

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

  const isOwner = user?.name === ownerName;

  return (
    <GuardQuery isLoading={isLoading} error={error}>
      <div className="flex h-screen overflow-hidden text-font-main bg-main-bg">
        <aside className="w-80 border-r border-font-muted/10 flex flex-col p-6 overflow-hidden">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest text-font-muted font-bold mb-2">
              Владелец: {ownerName}
            </p>
            <h1 className="text-2xl font-black tracking-tight text-font-main mb-2 truncate">
              {snapshot?.room.name}
            </h1>
            {snapshot?.room.description && (
              <p className="text-font-muted text-sm line-clamp-3 mb-4">
                {snapshot.room.description}
              </p>
            )}
            {snapshot?.room.invite_link && (
              <ShareRoomButton inviteLink={snapshot.room.invite_link} />
            )}
          </div>

          {isOwner && (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full mb-8 py-3"
              value={
                <div className="flex items-center gap-2 uppercase text-[10px] tracking-widest font-black">
                  <Plus size={16} /> Создать задачу
                </div>
              }
            />
          )}

          <div className="flex-1 overflow-hidden flex flex-col">
            <h3 className="text-[10px] uppercase tracking-widest text-font-muted font-bold mb-4">
              Список задач
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
              <TasksList tasks={snapshot?.tasks || []} />
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
          <div className="flex-1 min-h-0">
            {/* Проверяем наличие id перед рендерингом компонента */}
            {id && (
              <SelectedCard
                roomId={id}
                roundId={snapshot?.active_round?.id}
                snapshot={snapshot}
                tasks={snapshot?.tasks || []}
                availableCards={snapshot?.room.deck.cards || []}
              />
            )}
          </div>

          <div className="h-fit card-bg border border-font-muted/10 rounded-3xl p-6 overflow-x-auto">
            <ParticipantsList />
          </div>
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Новая задача"
        >
          <CreateTaskForm
            roomId={id!}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </GuardQuery>
  );
};
