import { Task } from "@/entities/task/model/types";
import { useRoomStore } from "../model/useRoomStore";
import { useVotingStore } from "@/features/room/model/useVotingStore";
import { Card } from "@/widgets/Room/Card";
import { SquareDashed, X, Layers } from "lucide-react";
import { submitVote, startRound } from "../api/roomVote.api";
import { RoomSnapshot } from "../model/types";
import { useSessionStore } from "@/entities/session/model/useSessionStore";

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
  const {
    isVotingMode,
    setVotingMode,
    selectedTask: selectedTaskId,
  } = useRoomStore();
  const user = useSessionStore((state) => state.user);
  const { selectedTask: myVote, selectCard } = useVotingStore();
  const task = tasks.find((t) => t.id === selectedTaskId);

  //экшены голосования
  const handleClickDone = ({ val }: { val: any }) => {
    console.log("Голос отправлен", val, roundId);
    submitVote(roomId, roundId, val);
  };

  const handleStartRound = async () => {
    console.log("Room ID:", roomId);
    console.log("Task ID:", selectedTaskId);
    if (!roomId || !selectedTaskId) {
      return;
    }
    try {
      await startRound(roomId, selectedTaskId);
      setVotingMode(true);
    } catch (error) {
      console.error("Ошибка старта раунда:", error);
    }
  };

  //нахожу имя создателя комнаты
  const isOwner = String(user?.id) === String(snapshot?.room.owner_id);

  if (!task) {
    return (
      <div className="border-l border-font-muted/20 flex flex-col items-center justify-center h-full p-12 text-font-main/50 transition-all duration-500">
        <SquareDashed size={64} strokeWidth={1} className="mb-6 opacity-50" />
        <p className="text-lg font-light tracking-wide text-center max-w-[280px]">
          Выберите задачу для обсуждения
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden card-bg border-l border-font-muted/20 h-full transition-all duration-500 flex flex-col p-12 text-center items-center">
      <div className="flex justify-between items-center w-full mb-8 z-20">
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-font-muted">
            {isVotingMode ? "Режим оценки" : "Детали обсуждения"}
          </span>
        </div>

        <button
          onClick={() => setVotingMode(!isVotingMode)}
          className={`group flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-200 font-bold text-[10px] uppercase tracking-[0.2em] cursor-pointer
            ${
              isVotingMode
                ? "border-font-muted/20 bg-font-muted/5 text-font-muted hover:bg-font-muted/10"
                : "border-accent/20 bg-accent/10 text-accent hover:bg-accent/20"
            }`}
        >
          {isVotingMode ? (
            <>
              <X size={14} /> Скрыть карты
            </>
          ) : (
            <>
              <Layers
                size={14}
                className="group-hover:rotate-12 transition-transform"
              />
              Выбрать оценку
            </>
          )}
        </button>
        {isOwner && (
          <button
            onClick={handleStartRound}
            className="px-4 py-2 rounded-xl border border-accent/20 text-accent font-bold hover:bg-accent/40 hover:border-accent/60 cursor-pointer transition-all duration-300 active:scale-95"
          >
            Начать голосование
          </button>
        )}
      </div>

      <div
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${
          isVotingMode ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        <h2 className="text-6xl font-black text-font-main mb-10 tracking-tighter leading-tight balance">
          {task.title}
        </h2>

        <div className="max-w-md">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent font-black mb-6 opacity-50">
            Описание
          </h4>
          <p className="text-xl text-font-muted leading-relaxed font-light italic">
            {task.description || "Контекст обсуждения не задан..."}
          </p>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 bottom-12 z-30 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVotingMode
            ? "translate-y-0 opacity-100"
            : "translate-y-32 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start px-12">
          <div className="flex justify-between w-full items-center">
            <p className="text-sm uppercase text-accent font-bold mb-6">
              {!myVote
                ? "Выберите номинал"
                : myVote === "break"
                  ? "Выбрано: Отдых"
                  : `Выбрано: ${myVote}`}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handleClickDone({ val: myVote })}
                className="px-4 py-2 rounded-xl border border-accent/20 text-accent font-bold hover:bg-accent/40 hover:border-accent/60 cursor-pointer transition-all duration-300 active:scale-95"
              >
                Готово
              </button>
            </div>
          </div>

          <div className="flex gap-3 justify-center items-end w-full overflow-x-auto no-scrollbar py-4">
            {availableCards.map((val) => (
              <div key={val} className="flex-shrink-0">
                <Card
                  value={val}
                  isActive={myVote === val}
                  onClick={() => selectCard(val)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
