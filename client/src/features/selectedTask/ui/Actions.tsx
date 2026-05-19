import { Button } from "@/shared";
import { useRoomActions } from "@/entities/room/api/roomVote.api";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { IRoomSnapshot } from "@/entities/room/model/types";

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
      <div className="flex gap-2">
        <Button
          value="Начать раунд"
          disabled={!id || !selectedTask}
          onClick={() => selectedTask && actions.start(selectedTask)}
        />
      </div>
    );
  }

  if (isVoting) {
    return (
      <div className="flex gap-2">
        <Button
          value={
            canReveal
              ? "Раскрыть раунд"
              : `Ожидание голосов (${activeRound.votes_submitted}/${activeRound.total_participants})`
          }
          variant="accentLiner"
          disabled={!canReveal}
          onClick={() => {
            actions.reveal(activeRound.id);
            console.log("snapshot: ", snapshot);
          }}
        />
        <Button
          value="Сбросить"
          variant="ghost"
          onClick={() => {
            actions.reset(activeRound.id);
            console.log("snapshot: ", snapshot);
          }}
        />
      </div>
    );
  }

  if (isRevealed) {
    return (
      <div className="flex gap-2">
        <Button
          value={`Принять оценку${activeRound.suggested_result ? ` (${activeRound.suggested_result})` : ""}`}
          variant="accent"
          onClick={() => {
            actions.finalize(
              activeRound.id,
              activeRound.suggested_result ?? "",
            );
            console.log("snapshot: ", snapshot);
          }}
        />
        <Button
          value="Переголосовать"
          variant="ghost"
          onClick={() => actions.reset(activeRound.id)}
        />
      </div>
    );
  }

  return null;
};
