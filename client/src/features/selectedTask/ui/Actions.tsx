import { Button } from "@/shared";
import { useRoomActions } from "@/entities/room/api/roomVote.api";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { IRoomSnapshot } from "@/entities/room/model/types";
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
      <div className="grid grid-cols-2 gap-3">
        <Button
          value={
            <span className="flex items-center justify-center gap-2 font-semibold tracking-tight">
              <RotateCcw size={14} />
              Сбросить
            </span>
          }
          variant="ghost"
          className="w-full border border-font-muted/10 hover:border-font-muted/20"
          onClick={() => actions.reset(activeRound.id)}
        />
        <Button
          value={
            canReveal ? (
              <span className="flex items-center justify-center gap-2 font-semibold tracking-tight">
                <Eye size={16} />
                Раскрыть
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 font-semibold tracking-tight">
                <Clock size={14} />
                Ждем...
              </span>
            )
          }
          className="w-full shadow-lg shadow-accent/20"
          variant="accent"
          disabled={!canReveal}
          onClick={() => actions.reveal(activeRound.id)}
        />
      </div>
    );
  }

  if (isRevealed) {
    return (
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
    );
  }

  return null;
};
