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
    <div className="flex flex-col gap-5 w-full">
      <div className="h-px w-full bg-gradient-to-r from-font-muted/20 via-font-muted/10 to-transparent" />

      {hasVoted && (
        <div className="flex items-center gap-2.5 text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-4 py-2 rounded-full self-start shadow-sm shadow-accent/5">
          <CheckCircle size={14} className="text-accent" />
          <span>
            Ваш голос:{" "}
            <span className="text-font-main ml-0.5">{selfVoteValue}</span>
          </span>
        </div>
      )}

      {cardValues.length === 0 ? (
        <p className="text-sm text-font-muted/40 italic">Карточки не найдены</p>
      ) : (
        <div className="flex flex-col gap-4">
          {!hasVoted && (
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50 ml-1">
              Выберите оценку
            </h2>
          )}
          <div className="flex gap-2.5 justify-start items-center flex-wrap">
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
        </div>
      )}

      {!hasVoted && (
        <div className="mt-2">
          <Button
            disabled={!value || isSubmitting}
            value={isSubmitting ? "Отправка..." : "Проголосовать"}
            onClick={handleVote}
            variant="accent"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};
