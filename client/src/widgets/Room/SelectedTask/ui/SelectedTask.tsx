import { IRoomSnapshot } from "@/entities/room/model/types";
import { useSelectedTaskStore } from "../model/useSelectedTaskStore";
import { Actions } from "@/features/selectedTask/ui/Actions";
import { VotingDeсk } from "../../VoitingDesk/VotingDeсk";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { RevealRoundVotes } from "./RevealRoundVotes";
import { SquareDashed, X } from "lucide-react";

import { useDroppable } from "@dnd-kit/core";

export const SelectedTask = ({
  snapshot,
  id,
}: {
  snapshot: IRoomSnapshot;
  id: string | undefined;
}) => {
  const initSelectedTaskId = useSelectedTaskStore(
    (state) => state.initSelectedTaskId,
  );
  const user = useSessionStore((state) => state.user);
  const isOwner = !!user && snapshot.room.owner_id === user.id;
  const selectedTask = useSelectedTaskStore((state) => state.selectedTask);

  const { setNodeRef, isOver } = useDroppable({
    id: "selectZone",
  });

  const selectedTaskId =
    selectedTask == null ? snapshot.active_round?.task_id : selectedTask;
  const currentTask = snapshot?.tasks?.find(
    (t: any) => t.id === selectedTaskId,
  );
  const activeRound = snapshot?.active_round;
  const isThisTaskRound =
    !!activeRound && activeRound.task_id === selectedTaskId;

  // флаги для отрисовки экшенов
  const isVoting = isThisTaskRound && activeRound.status === "voting";
  const isRevealed = isThisTaskRound && activeRound.status === "revealed";

  if (!currentTask) {
    return (
      <div
        ref={setNodeRef}
        className={`flex-1 w-full p-5 border bg-card-bg rounded-xl flex flex-col items-center justify-center gap-3 select-none group cursor-default transition-all duration-300 ${
          isOver
            ? "border-accent bg-accent/5 scale-[1.01] shadow-lg shadow-accent/5"
            : "border-font-main/20"
        }`}
      >
        <SquareDashed
          size={40}
          className={`transition-colors duration-300 ${
            isOver
              ? "text-accent animate-pulse"
              : "text-font-muted/40 group-hover:text-accent/50"
          }`}
        />
        <div className="flex flex-col items-center gap-1">
          <span
            className={`text-sm font-medium transition-colors ${isOver ? "text-accent" : "text-font-muted/80"}`}
          >
            Задача не выбрана
          </span>
          <span className="text-xs text-font-muted/40 text-center max-w-[180px] leading-relaxed">
            Выберите или перетащите задачу из списка
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 justify-center w-full p-5 border bg-card-bg rounded-xl flex flex-col gap-4 h-full transition-all duration-300 border border-font-muted/30`}
    >
      <button
        onClick={() => initSelectedTaskId(null)}
        className="flex items-center justify-center gap-0.5 w-full mb-3 cursor-pointer"
      >
        <X
          size={20}
          className="text-font-muted/60 group-hover:text-accent transition-colors"
        />
      </button>
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-2xl text-font-main font-bold leading-tight">
          {currentTask.title}
        </h1>
        {currentTask.estimate_value && (
          <div className="border border-accent/30 px-4 py-2 rounded-xl flex flex-col items-center justify-center shrink-0 min-w-16 bg-accent/5">
            <span className="text-[10px] text-font-muted uppercase font-semibold mb-0.5 tracking-widest">
              Итог
            </span>
            <span className="text-accent font-bold text-2xl">
              {currentTask.estimate_value}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <h4 className="text-xs text-font-muted uppercase tracking-widest font-semibold">
          Описание
        </h4>
        <p className="text-font-main leading-relaxed overflow-y-auto flex-1">
          {currentTask.description || (
            <span className="text-font-muted italic">Описание отсутствует</span>
          )}
        </p>
      </div>

      {isOwner && (
        <div className="border-t border-b border-font-main/20 py-2">
          <Actions id={id} snapshot={snapshot} />
        </div>
      )}

      {isRevealed && activeRound && <RevealRoundVotes snapshot={snapshot} />}
      {isVoting && activeRound && (
        <VotingDeсk snapshot={snapshot} roomId={id} roundId={activeRound.id} />
      )}
    </div>
  );
};
