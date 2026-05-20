import { IRoomSnapshot } from "@/entities/room/model/types";
import { useSelectedTaskStore } from "../model/useSelectedTaskStore";
import { Actions } from "@/features/selectedTask/ui/Actions";
import { VotingDeсk } from "../../VoitingDesk/VotingDeсk";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { RevealRoundVotes } from "./RevealRoundVotes";
import { SquareDashed, X } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";

export const SelectedTask = memo(
  ({ snapshot, id }: { snapshot: IRoomSnapshot; id: string | undefined }) => {
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

    const isVoting = isThisTaskRound && activeRound.status === "voting";
    const isRevealed = isThisTaskRound && activeRound.status === "revealed";

    if (!currentTask) {
      return (
        <div
          ref={setNodeRef}
          className={`flex-1 w-full min-h-[200px] p-8 border bg-card-bg rounded-2xl flex flex-col items-center justify-center gap-4 select-none group cursor-default transition-all duration-300 will-change-transform ${
            isOver
              ? "border-accent bg-accent/10 scale-[1.02] ring-2 ring-accent/20"
              : "border-font-main/10 shadow-sm"
          }`}
        >
          <div
            className={`p-4 rounded-full transition-colors duration-300 ${isOver ? "bg-accent/20" : "bg-font-muted/5"}`}
          >
            <SquareDashed
              size={48}
              className={`transition-all duration-500 ${
                isOver
                  ? "text-accent scale-110 rotate-12"
                  : "text-font-muted/30"
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <span
              className={`text-base font-bold transition-colors ${isOver ? "text-accent" : "text-font-muted"}`}
            >
              Задача не выбрана
            </span>
            <p className="text-sm text-font-muted/40 max-w-[220px] leading-snug">
              Перетащите сюда задачу для начала обсуждения
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={setNodeRef}
        className={`relative flex-1 justify-center w-full p-6 border bg-card-bg rounded-2xl flex flex-col gap-6 h-full transition-all duration-300 will-change-transform ${
          isOver
            ? "border-accent bg-accent/5 ring-2 ring-accent/10"
            : "border-font-muted/20 shadow-sm"
        }`}
      >
        <button
          onClick={() => initSelectedTaskId(null)}
          className="absolute top-4 right-4 p-2 text-font-muted/40 hover:text-accent hover:bg-accent/5 rounded-xl transition-all cursor-pointer"
          title="Сбросить выбор"
        >
          <X size={20} />
        </button>

        <div className="flex justify-between items-start gap-4 pr-10">
          <div className="flex flex-col gap-1">
            <h4 className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">
              Текущая задача
            </h4>
            <h1 className="text-3xl text-font-main font-black leading-tight">
              {currentTask.title}
            </h1>
          </div>
          {currentTask.estimate_value && (
            <div className="border border-accent/30 px-5 py-2.5 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-20 bg-accent/10 shadow-inner">
              <span className="text-[10px] text-font-muted uppercase font-bold mb-0.5 tracking-widest">
                Оценка
              </span>
              <span className="text-accent font-black text-3xl">
                {currentTask.estimate_value}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 flex-1 min-h-0 bg-font-muted/5 p-4 rounded-xl border border-font-muted/5">
          <h4 className="text-xs text-font-muted uppercase tracking-widest font-bold flex items-center gap-2">
            Описание
          </h4>
          <p className="text-font-main/90 leading-relaxed overflow-y-auto flex-1 text-sm scrollbar-thin scrollbar-thumb-accent/20">
            {currentTask.description || (
              <span className="text-font-muted/50 italic">
                Описание отсутствует
              </span>
            )}
          </p>
        </div>

        {isOwner && (
          <div className="border-t border-font-main/10 pt-4">
            <Actions id={id} snapshot={snapshot} />
          </div>
        )}

        {isRevealed && activeRound && <RevealRoundVotes snapshot={snapshot} />}
        {isVoting && activeRound && (
          <VotingDeсk
            snapshot={snapshot}
            roomId={id}
            roundId={activeRound.id}
          />
        )}
      </div>
    );
  },
);
