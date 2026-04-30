import { Task } from "@/entities/task/model/types";
import { useRoomStore } from "../model/useRoomStore";
import { useVotingStore } from "@/features/room/model/useVotingStore";
import { Card } from "@/widgets/Room/Card";
import { SquareDashed, AlignLeft, X, Layers } from "lucide-react";

interface SelectedCardProps {
  tasks: Task[];
  availableCards: string[];
}

export const SelectedCard = ({ tasks, availableCards }: SelectedCardProps) => {
  const {
    selectedTask: selectedTaskId,
    isVotingMode,
    setVotingMode,
  } = useRoomStore();
  const { selectedTask: myVote, selectCard } = useVotingStore();

  const task = tasks.find((t) => t.id === selectedTaskId);

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
          className={`group flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.2em]
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
      </div>

      <div
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${isVotingMode ? "translate-y-[-100px]" : "translate-y-0"}`}
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
        className={`absolute inset-x-0 bottom-12 z-30 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVotingMode
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start px-12">
          <p className="text-sm uppercase text-accent font-bold mb-6">
            {!myVote
              ? "Выберите номинал"
              : myVote === "break   "
                ? "Выбрано: Отдых"
                : `Выбрано: ${myVote}`}
          </p>

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
