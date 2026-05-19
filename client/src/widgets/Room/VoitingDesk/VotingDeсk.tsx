import { useState } from "react";
import { VoitingCard } from "./VoitingCard";
import { useRoomActions } from "@/entities/room/api/roomVote.api";
import { Button } from "@/shared";
import { IRoomSnapshot } from "@/entities/room/model/types";
import { Coffee } from "lucide-react";

export const VotingDeсk = ({
  snapshot,
  roomId,
  roundId,
}: {
  snapshot: IRoomSnapshot;
  roomId: string | undefined;
  roundId: string;
}) => {
  const actions = useRoomActions(roomId);
  const [value, setValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardValues: string[] = snapshot?.room?.deck?.cards ?? [];

  const selfVoteValue = snapshot?.active_round?.self_vote_value;
  const hasVoted = !!selfVoteValue;

  const activeValue = hasVoted ? selfVoteValue : value;

  const handleVote = async () => {
    if (!value || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await actions.vote(roundId, value);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4 px-3 w-full">
      {hasVoted && (
        <p className="text-xs text-font-muted uppercase tracking-widest">
          Ваш голос принят —{" "}
          <span className="text-accent font-semibold">{selfVoteValue}</span>
        </p>
      )}

      {cardValues.length === 0 ? (
        <p className="text-font-muted text-sm">Карточки не найдены</p>
      ) : (
        <div className="flex gap-2.5 justify-center items-end h-22 flex-wrap">
          {cardValues.map((val: string) => (
            <VoitingCard
              key={val}
              val={val === "break" ? <Coffee /> : val}
              isActive={val === activeValue}
              isDisabled={hasVoted}
              onClick={hasVoted ? undefined : setValue}
            />
          ))}
        </div>
      )}

      {!hasVoted && (
        <Button
          disabled={!value || isSubmitting}
          value={isSubmitting ? "Отправка..." : "Проголосовать"}
          onClick={handleVote}
          variant="accent"
        />
      )}
    </div>
  );
};
