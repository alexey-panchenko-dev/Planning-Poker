// Actions.tsx
import { Button } from "@/shared";
import { useRoomActions } from "@/entities/room/api/roomVote.api";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { IRoomSnapshot } from "@/entities/room/model/types";
import { FinalizeRound } from "./FinalizeRound";
import { Play, Eye, RotateCcw, Clock } from "lucide-react";

export const Actions = ({
  id,
  snapshot,
}: {
  id: string | undefined;
  snapshot: IRoomSnapshot;
}) => {
  const selectedTask = useSelectedTaskStore((state) => state.selectedTask);
  const actions = useRoomActions(id);
  const activeRound = snapshot?.active_round;
  const isThisTaskRound = !!activeRound && activeRound.task_id === selectedTask;
  const isVoting = isThisTaskRound && activeRound.status === "voting";
  const isRevealed = isThisTaskRound && activeRound.status === "revealed";
  const canReveal = isVoting && activeRound.can_reveal;

  if (!isThisTaskRound) {
    return (
      <Button
        value={
          <span className="flex items-center justify-center gap-2">
            <Play size={14} />
            Начать раунд
          </span>
        }
        className="w-full"
        disabled={!id || !selectedTask}
        onClick={() => selectedTask && actions.start(selectedTask)}
        variant="accent"
      />
    );
  }

  if (isVoting) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Button
          value={
            canReveal ? (
              <span className="flex items-center justify-center gap-2">
                <Eye size={14} />
                Раскрыть раунд
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <Clock size={13} />
                {activeRound.votes_submitted}/{activeRound.total_participants}
              </span>
            )
          }
          className="w-full"
          variant="accentLiner"
          disabled={!canReveal}
          onClick={() => actions.reveal(activeRound.id)}
        />
        <Button
          value={
            <span className="flex items-center justify-center gap-2">
              <RotateCcw size={14} />
              Сбросить
            </span>
          }
          variant="ghost"
          onClick={() => actions.reset(activeRound.id)}
        />
      </div>
    );
  }

  if (isRevealed) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <FinalizeRound snapshot={snapshot} activeRound={activeRound} id={id} />
        <Button
          value={
            <span className="flex items-center justify-center gap-2">
              <RotateCcw size={14} />
              Переголосовать
            </span>
          }
          variant="ghost"
          className="w-full"
          onClick={() => actions.reset(activeRound.id)}
        />
      </div>
    );
  }

  return null;
};
