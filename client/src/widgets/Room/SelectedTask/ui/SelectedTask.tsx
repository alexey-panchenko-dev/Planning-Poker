import { IRoomSnapshot } from "@/entities/room/model/types";
import { useSelectedTaskStore } from "../model/useSelectedTaskStore";
import { Actions } from "@/features/selectedTask/ui/Actions";
import { VotingDeсk } from "../../VoitingDesk/VotingDeсk";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { RevealRoundVotes } from "./RevealRoundVotes";
import { SquareDashed } from "lucide-react";

export const SelectedTask = ({
  snapshot,
  id,
}: {
  snapshot: IRoomSnapshot;
  id: string | undefined;
}) => {
  const user = useSessionStore((state) => state.user);
  const isOwner = !!user && snapshot.room.owner_id === user.id;
  const selectedTask = useSelectedTaskStore((state) => state.selectedTask);

  const selectedTaskId =
    selectedTask == null ? snapshot.active_round?.task_id : selectedTask;
  const currentTask = snapshot?.tasks?.find(
    (t: any) => t.id === selectedTaskId,
  );
  const activeRound = snapshot?.active_round;
  const isThisTaskRound =
    !!activeRound && activeRound.task_id === selectedTaskId;
  const isVoting = isThisTaskRound && activeRound.status === "voting";
  const isRevealed = isThisTaskRound && activeRound.status === "revealed";

  if (!currentTask) {
    return (
      <div className="flex-1 w-full p-5 border border-font-main/20 bg-card-bg rounded-xl flex flex-col items-center justify-center gap-3 select-none group cursor-default">
        <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-font-muted/30 group-hover:border-accent/40 flex items-center justify-center transition-colors duration-300">
          <SquareDashed
            size={24}
            className="text-font-muted/40 group-hover:text-accent/50 transition-colors duration-300"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-font-muted/80">
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
    <div className="flex-1 w-full p-5 border border-font-main/20 bg-card-bg rounded-xl flex flex-col gap-4 h-full">
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
