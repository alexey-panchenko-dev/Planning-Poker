import { Task } from "@/entities/task/model/types";
import { useRoomStore } from "../model/useRoomStore";
import { SquareDashed } from "lucide-react";
import { startRound, revealRound } from "../api/roomVote.api";
import { RoomSnapshot } from "../model/types";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { VotingDeck } from "@/features/room/ui/VotingDeck";
import { Button } from "@/shared";

interface SelectedCardProps {
  roomId: any;
  roundId: any;
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

  const task = tasks.find((t) => t.id === selectedTaskId);

  const isVotingActive = snapshot?.active_round?.status === "voting";
  const isOwner = String(user?.id) === String(snapshot?.room.owner_id);

  const handleStartRound = async () => {
    if (!roomId || !selectedTaskId) return;
    try {
      await startRound(roomId, selectedTaskId);
    } catch (error) {
      console.error("Ошибка старта раунда:", error);
    }
  };

  const handleRevealRound = async () => {
    if (!roomId || !selectedTaskId) return;
    try {
      await revealRound(roomId, roundId);
    } catch (error) {
      console.error("Ошибка раскрытия карт:", error);
    }
  };

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
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-font-muted">
            {isVotingActive ? "Идет процесс оценки..." : "Детали обсуждения"}
          </span>
        </div>

        <div className="flex gap-2">
          {isOwner && (
            <>
              <Button
                onClick={handleStartRound}
                variant="accentLiner"
                className="text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6"
                value={isVotingActive ? "Перезапустить" : "Начать раунд"}
              />
              <Button
                onClick={handleRevealRound}
                variant={isVotingActive ? "accent" : "accentLiner"}
                disabled={!isVotingActive}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6 transition-all duration-300 ${
                  !isVotingActive
                    ? "opacity-50 grayscale cursor-not-allowed"
                    : ""
                }`}
                value="Раскрыть карты"
              />
            </>
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

        <div className="max-w-2xl w-full">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent font-black mb-4 opacity-50">
            Описание
          </h4>
          <p className="text-lg text-font-muted leading-relaxed font-light italic break-words whitespace-pre-wrap">
            {task.description || "Контекст обсуждения не задан..."}
          </p>
        </div>
      </div>

      {/* Колода */}
      <div
        className={`absolute inset-x-0 bottom-8 z-30 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVotingActive
            ? "translate-y-0 opacity-100"
            : "translate-y-64 opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-10 pb-4">
          <VotingDeck
            roomId={roomId}
            roundId={roundId}
            availableCards={availableCards}
          />
        </div>
      </div>
    </div>
  );
};
