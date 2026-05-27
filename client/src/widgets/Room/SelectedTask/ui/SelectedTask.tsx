import { IRoomSnapshot, ITask } from "@/entities/room/model/types";
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
      (t: ITask) => t.id === selectedTaskId,
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
          className={`flex-1 w-full min-h-[300px] p-8 border rounded-2xl flex flex-col items-center justify-center gap-5 select-none cursor-default transition-all duration-300 will-change-transform backdrop-blur-sm ${
            isOver
              ? "border-accent bg-accent/10 scale-[1.01] ring-2 ring-accent/20"
              : "border-font-main/10 bg-card-bg/20"
          }`}
        >
          <div
            className={`p-5 rounded-2xl transition-all duration-300 ${isOver ? "bg-accent/20 rotate-6" : "bg-font-muted/5"}`}
          >
            <SquareDashed
              size={52}
              className={`transition-all duration-500 ${
                isOver ? "text-accent scale-110" : "text-font-muted/20"
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              className={`text-lg font-semibold transition-colors ${isOver ? "text-accent" : "text-font-muted/60"}`}
            >
              Задача не выбрана
            </span>
            <p className="text-sm text-font-muted/40 max-w-[240px] leading-relaxed">
              Перетащите сюда задачу из списка слева для начала обсуждения
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={setNodeRef}
        className={`relative flex-1 w-full border bg-card-bg/40 backdrop-blur-md rounded-2xl transition-all duration-300 will-change-transform ${
          isOver
            ? "border-accent bg-accent/5 ring-2 ring-accent/10"
            : "border-font-main/15 shadow-xl shadow-black/5"
        }`}
      >
        <div className="grid grid-cols-[1.5fr_2fr] h-full min-h-[400px]">
          <div className="flex flex-col gap-5 p-6 pr-5 min-w-0">
            <div className="flex flex-col gap-1.5 pr-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent/70 mb-0.5">
                Текущая задача
              </span>
              <h1 className="text-2xl font-bold text-font-main leading-tight break-words tracking-tight">
                {currentTask.title}
              </h1>
            </div>

            {currentTask.estimate_value && (
              <div className="self-start flex flex-col items-center border border-accent/20 bg-accent/10 px-5 py-2.5 rounded-2xl min-w-20 shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-widest text-font-muted/50 mb-1">
                  Оценка
                </span>
                <span className="text-accent font-bold text-3xl leading-none">
                  {currentTask.estimate_value}
                </span>
              </div>
            )}

            <div className="h-px w-full bg-gradient-to-r from-font-muted/20 via-font-muted/10 to-transparent" />

            <div className="flex flex-col gap-3 flex-1 min-h-0">
              <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50">
                Описание
              </span>
              <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-accent/20 pr-2">
                <p className="text-[15px] text-font-main font-medium leading-relaxed break-words whitespace-pre-wrap">
                  {currentTask.description || (
                    <span className="text-font-muted/30 italic font-normal">
                      Описание отсутствует
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 pl-5 border-l border-font-muted/10 bg-inner-bg/20">
            {isOwner && (
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50">
                  Управление раундом
                </span>
                <Actions id={id} snapshot={snapshot} />
              </div>
            )}

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
