import { Button } from "@/shared";
import { useRoomActions } from "@/entities/room/api/roomVote.api";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { IRoomSnapshot } from "@/entities/room/model/types";
import { FinalizeRound } from "./FinalizeRound";

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
      <div className="flex gap-2 w-full justify-center py-2">
        <Button
          value="Начать раунд"
          className="w-full"
          disabled={!id || !selectedTask}
          onClick={() => selectedTask && actions.start(selectedTask)}
          variant="accent"
        />
      </div>
    );
  }

  if (isVoting) {
    return (
      <div className="flex flex-col sm:flex-row w-full gap-5 justify-center items-center py-2 grid grid-cols-2">
        <Button
          value={
            canReveal
              ? "Раскрыть раунд"
              : `Ожидание голосов (${activeRound.votes_submitted}/${activeRound.total_participants})`
          }
          className="w-full "
          variant="accentLiner"
          disabled={!canReveal}
          onClick={() => actions.reveal(activeRound.id)}
        />
        <Button
          value="Сбросить раунд"
          variant="ghost"
          onClick={() => actions.reset(activeRound.id)}
        />
      </div>
    );
  }

  if (isRevealed) {
    return (
      <div className="flex flex-col items-center gap-4 w-full">
        <FinalizeRound snapshot={snapshot} activeRound={activeRound} id={id} />

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
