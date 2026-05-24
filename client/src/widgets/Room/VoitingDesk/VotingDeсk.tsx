import { useState } from "react";
import { VoitingCard } from "./VoitingCard";
import { useRoomActions } from "@/entities/room/api/roomVote.api";
import { Button } from "@/shared";
import { IRoomSnapshot } from "@/entities/room/model/types";
import { CheckCircle } from "lucide-react";

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
    <div className="flex flex-col gap-4 w-full">
      <div className="h-px w-full bg-font-muted/20" />

      {hasVoted && (
        <div className="flex items-center gap-2 text-sm text-font-muted/60 bg-accent/5 border border-accent/20 px-3 py-1.5 rounded-lg self-start">
          <CheckCircle size={14} className="text-accent" />
          <span>
            Ваш голос —{" "}
            <span className="text-accent font-medium">{selfVoteValue}</span>
          </span>
        </div>
      )}

      {cardValues.length === 0 ? (
        <p className="text-base text-font-muted/50">Карточки не найдены</p>
      ) : (
        <>
          {!hasVoted && (
            <h2 className="text-sm uppercase tracking-widest text-font-muted/60">
              Выберите оценку
            </h2>
          )}
          <div className="flex gap-2 justify-start items-end flex-wrap">
            {cardValues.map((val: string) => (
              <VoitingCard
                key={val}
                val={val}
                isActive={val === activeValue}
                isDisabled={hasVoted}
                onClick={hasVoted ? undefined : setValue}
              />
            ))}
          </div>
        </>
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
