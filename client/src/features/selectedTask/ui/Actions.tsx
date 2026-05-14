import { Button } from "@/shared";

import {
  startRound,
  revealRound,
  resetRound,
  finalizeRound,
} from "@/entities/room/api/roomVote.api";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";

export const Actions = ({ id }: { id: string | undefined }) => {
  const selectedTaskId = useSelectedTaskStore((state) => state.selectedTaskId);
  const isRoundStart = useSelectedTaskStore((state) => state.isRoundStart);

  const handleStartRound = () => {
    if (id && selectedTaskId) {
      startRound(id, selectedTaskId);
    }
  };

  return (
    <div className="flex gap-2">
      {!isRoundStart ? (
        <Button
          value="Начать раунд"
          disabled={!id || !selectedTaskId}
          onClick={handleStartRound}
        />
      ) : (
        <Button value="Перезапустить" />
      )}
    </div>
  );
};
