import { useMemo, useState } from "react";
import { SquareDashed } from "lucide-react";
import { Task } from "@/entities/task/model/types";
import { useRoomStore } from "../model/useRoomStore";
import { RoomSnapshot } from "../model/types";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { VotingDeck } from "@/features/room/ui/VotingDeck";
import { FinalizeRoundModal } from "./FinalizeRoundModal";
import { RevealVotes } from "./RevealVotes";
import { Actions } from "./Actions";

interface SelectedCardProps {
  roomId: string;
  roundId: string | undefined;
  tasks: Task[];
  availableCards: string[];
  snapshot?: RoomSnapshot;
}

export const SelectedCard = ({
  roomId,
  roundId,
  tasks,
  availableCards,
  snapshot,
}: SelectedCardProps) => {
  const { selectedTask: selectedTaskId } = useRoomStore();
  const user = useSessionStore((state) => state.user);

  const [isFModal, setIsFModal] = useState(false);
  const [isRevealModal, setIsRevealModal] = useState(false);

  const task = tasks.find((t) => t.id === selectedTaskId);

  const historyEntry = useMemo(() => {
    return snapshot?.history.find((h) => h.task_id === selectedTaskId);
  }, [snapshot?.history, selectedTaskId]);

  const isVotingActive = snapshot?.active_round?.status === "voting";
  const isOwner = String(user?.id) === String(snapshot?.room.owner_id);

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-font-main/50 transition-all duration-500 card-bg rounded-3xl border border-font-muted/10">
        <SquareDashed size={64} strokeWidth={1} className="mb-6 opacity-50" />
        <p className="text-lg font-light tracking-wide text-center max-w-[280px]">
          Выберите задачу для обсуждения
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden card-bg rounded-3xl border border-font-muted/10 h-full transition-all duration-500 flex flex-col p-8 md:p-12 text-center items-center">
      <div className="flex justify-between items-center w-full mb-8 z-20 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-font-muted text-left">
            {isVotingActive ? "Идет процесс оценки..." : "Детали обсуждения"}
          </span>
        </div>

        <div className="flex gap-2">
          {isOwner && (
            <Actions
              roomId={roomId}
              roundId={roundId}
              selectedTaskId={selectedTaskId}
              isVotingActive={isVotingActive}
              setIsFModal={setIsFModal}
              setIsRevealModal={setIsRevealModal}
            />
          )}
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 ease-out w-full ${
          isVotingActive
            ? "-translate-y-24 scale-95 opacity-80"
            : "translate-y-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-black text-font-main mb-6 tracking-tighter leading-tight break-words w-full max-w-2xl">
          {task.title}
        </h2>

        {historyEntry ? (
          <div className="w-full flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <RevealVotes snapshot={snapshot} />

            <div className="flex flex-col items-center p-6 rounded-2xl bg-accent/5 border border-accent/10 w-full max-w-sm">
              <span className="text-[10px] uppercase tracking-widest text-accent font-black mb-1">
                Итоговая оценка
              </span>
              <span className="text-5xl font-black text-font-main">
                {historyEntry.result_value}
              </span>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl w-full">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent font-black mb-4 opacity-50">
              Описание
            </h4>
            <p className="text-lg text-font-muted leading-relaxed font-light italic break-words whitespace-pre-wrap">
              {task.description || "Контекст обсуждения не задан..."}
            </p>
          </div>
        )}
      </div>

      <div
        className={`absolute inset-x-0 bottom-8 z-30 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVotingActive
            ? "translate-y-0 opacity-100"
            : "translate-y-64 opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-10 pb-4">
          {roundId && (
            <VotingDeck
              roomId={roomId}
              roundId={roundId}
              availableCards={availableCards}
            />
          )}
        </div>
      </div>

      {roundId && (
        <FinalizeRoundModal
          isOpen={isFModal}
          onClose={() => setIsFModal(false)}
          roomId={roomId}
          roundId={roundId}
          availableCards={availableCards}
        />
      )}
    </div>
  );
};
