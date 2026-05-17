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
  const selectedTaskId = useSelectedTaskStore((state) => state.selectedTaskId);
  const actions = useRoomActions(id);

  const activeRound = snapshot?.active_round;

  const isThisTaskRound =
    !!activeRound && activeRound.task_id === selectedTaskId;
  const isVoting = isThisTaskRound && activeRound.status === "voting";
  const isRevealed = isThisTaskRound && activeRound.status === "revealed";
  const canReveal = isVoting && activeRound.can_reveal;

  if (!isThisTaskRound) {
    return (
      <div className="flex gap-2">
        <Button
          value="Начать раунд"
          disabled={!id || !selectedTaskId}
          onClick={() => selectedTaskId && actions.start(selectedTaskId)}
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
          onClick={() => actions.reveal(activeRound.id)}
        />
        <Button
          value="Сбросить"
          variant="ghost"
          onClick={() => actions.reset(activeRound.id)}
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
          onClick={() =>
            actions.finalize(activeRound.id, activeRound.suggested_result ?? "")
          }
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
