// SelectedTask.tsx
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

    const { setNodeRef, isOver } = useDroppable({ id: "selectZone" });

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
          className={`flex-1 w-full min-h-[200px] p-8 border rounded-xl flex flex-col items-center justify-center gap-4 select-none cursor-default transition-all duration-300 will-change-transform ${
            isOver
              ? "border-accent bg-accent/10 scale-[1.02] ring-2 ring-accent/20"
              : "border-font-main/10 bg-card-bg/20"
          }`}
        >
          <div
            className={`p-4 rounded-xl transition-colors duration-300 ${isOver ? "bg-accent/20" : "bg-font-muted/5"}`}
          >
            <SquareDashed
              size={40}
              className={`transition-all duration-500 ${
                isOver
                  ? "text-accent scale-110 rotate-12"
                  : "text-font-muted/20"
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span
              className={`text-sm font-medium transition-colors ${isOver ? "text-accent" : "text-font-muted/60"}`}
            >
              Задача не выбрана
            </span>
            <p className="text-xs text-font-muted/40 max-w-[200px] leading-relaxed">
              Перетащите сюда задачу для начала обсуждения
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={setNodeRef}
        className={`relative flex-1 w-full p-5 border bg-card-bg/20 rounded-xl flex flex-col gap-5 h-full transition-all duration-300 will-change-transform ${
          isOver
            ? "border-accent bg-accent/5 ring-2 ring-accent/10"
            : "border-font-main/20"
        }`}
      >
        {/* close */}
        <button
          onClick={() => initSelectedTaskId(null)}
          className="absolute top-4 right-4 p-1.5 text-font-muted/30 hover:text-accent hover:bg-accent/5 rounded-lg transition-all cursor-pointer"
          title="Сбросить выбор"
        >
          <X size={16} />
        </button>

        {/* header */}
        <div className="flex items-start justify-between gap-4 pr-8">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-widest text-accent/70">
              Текущая задача
            </span>
            <h1 className="text-xl font-medium text-font-main leading-tight">
              {currentTask.title}
            </h1>
          </div>
          {currentTask.estimate_value && (
            <div className="shrink-0 flex flex-col items-center border border-accent/30 bg-accent/5 px-4 py-2 rounded-xl min-w-16">
              <span className="text-[10px] uppercase tracking-widest text-font-muted/60 mb-0.5">
                Оценка
              </span>
              <span className="text-accent font-medium text-xl">
                {currentTask.estimate_value}
              </span>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-font-muted/20" />

        {/* description */}
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <span className="text-[11px] uppercase tracking-widest text-font-muted/60">
            Описание
          </span>
          <p className="text-sm text-font-main/80 leading-relaxed overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-accent/20">
            {currentTask.description || (
              <span className="text-font-muted/40 italic">
                Описание отсутствует
              </span>
            )}
          </p>
        </div>

        {isOwner && (
          <>
            <div className="h-px w-full bg-font-muted/20" />
            <Actions id={id} snapshot={snapshot} />
          </>
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
