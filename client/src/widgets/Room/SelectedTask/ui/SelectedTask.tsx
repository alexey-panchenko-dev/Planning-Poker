import { IRoomSnapshot } from "@/entities/room/model/types";
import { useSelectedTaskStore } from "../model/useSelectedTaskStore";
import { Actions } from "@/features/selectedTask/ui/Actions";
import { VotingDeсk } from "../../VoitingDesk/VotingDeсk";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { RevealRoundVotes } from "./RevealRoundVotes";
import { SquareDashed } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import { memo } from "react";
import { RoundHistory } from "./RoundHistory";

export const SelectedTask = memo(
  ({ snapshot, id }: { snapshot: IRoomSnapshot; id: string | undefined }) => {
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
          className={`flex-1 w-full min-h-[300px] p-8 border rounded-xl flex flex-col items-center justify-center gap-4 select-none cursor-default transition-all duration-300 will-change-transform ${
            isOver
              ? "border-accent bg-accent/10 scale-[1.02] ring-2 ring-accent/20"
              : "border-font-main/10 bg-card-bg/20"
          }`}
        >
          <div
            className={`p-4 rounded-xl transition-colors duration-300 ${isOver ? "bg-accent/20" : "bg-font-muted/5"}`}
          >
            <SquareDashed
              size={48}
              className={`transition-all duration-500 ${
                isOver
                  ? "text-accent scale-110 rotate-12"
                  : "text-font-muted/20"
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <span
              className={`text-base font-medium transition-colors ${isOver ? "text-accent" : "text-font-muted/60"}`}
            >
              Задача не выбрана
            </span>
            <p className="text-sm text-font-muted/40 max-w-[200px] leading-relaxed">
              Перетащите сюда задачу для начала обсуждения
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={setNodeRef}
        className={`relative flex-1 w-full border bg-card-bg rounded-xl h-full transition-all duration-300 will-change-transform overflow-hidden ${
          isOver
            ? "border-accent bg-accent/5 ring-2 ring-accent/10"
            : "border-font-main/20"
        }`}
      >
        <div className="grid grid-cols-[2fr_3fr] h-full">
          <div className="flex flex-col gap-4 p-5 pr-4 min-w-0">
            <div className="flex flex-col gap-1 pr-6">
              <span className="text-[13px] uppercase tracking-widest text-accent/70">
                Текущая задача
              </span>
              <h1 className="text-2xl font-medium text-font-main leading-tight break-words">
                {currentTask.title}
              </h1>
            </div>

            {currentTask.estimate_value && (
              <div className="self-start flex flex-col items-center border border-accent/30 bg-accent/5 px-4 py-2 rounded-xl min-w-16">
                <span className="text-xs uppercase tracking-widest text-font-muted/60 mb-0.5">
                  Оценка
                </span>
                <span className="text-accent font-medium text-2xl">
                  {currentTask.estimate_value}
                </span>
              </div>
            )}

            <div className="h-px w-full bg-font-muted/20" />

            <div className="flex flex-col gap-2 flex-1 min-h-0">
              <span className="text-[13px] uppercase tracking-widest text-font-muted/60">
                Описание
              </span>
              <p className="text-base text-font-main/80 leading-relaxed overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-accent/20 break-words whitespace-pre-wrap">
                {currentTask.description || (
                  <span className="text-font-muted/40 italic">
                    Описание отсутствует
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5 pl-4 border-l border-font-muted/10">
            {isOwner && <Actions id={id} snapshot={snapshot} />}

            {!isThisTaskRound && (
              <RoundHistory snapshot={snapshot} taskId={selectedTaskId} />
            )}

            {isRevealed && activeRound && (
              <RevealRoundVotes
                snapshot={snapshot}
                activeRound={activeRound}
                id={id}
                isOwner={isOwner}
              />
            )}

            {isVoting && activeRound && (
              <VotingDeсk
                snapshot={snapshot}
                roomId={id}
                roundId={activeRound.id}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);
