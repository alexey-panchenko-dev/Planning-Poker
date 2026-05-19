import { useState } from "react";
import { Button } from "@/shared";
import { VoitingCard } from "../../VoitingDesk/VoitingCard";

interface IRevRoundVotesProps {
  snapshot: any;
}

const VoteItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="p-4 bg-card-bg/20 border border-font-muted/20 rounded-2xl flex flex-col items-center justify-between gap-3 min-w-[110px] transition-all duration-300 hover:-translate-y-1 hover:border-font-muted/50">
      <p className="text-xs text-font-main font-semibold truncate w-full text-center">
        {name}
      </p>

      <VoitingCard
        val={value ? value : "X"}
        isActive={value ? true : false}
        isDisabled={true}
      />
    </div>
  );
};

export const RevealRoundVotes = ({ snapshot }: IRevRoundVotesProps) => {
  const [showVotes, setShowVotes] = useState(true);

  const activeRound = snapshot?.active_round;
  const participants = snapshot?.participants || [];
  const votes = activeRound?.votes || [];

  if (activeRound?.status !== "revealed") return null;

  //перевод из айди голосовавшего в обьект с именем айдишником и значением
  const participantsMap: Record<string, string> = {};
  participants.forEach((p: any) => {
    participantsMap[p.id] = p.name;
  });

  const enrichedVotes = votes.map((vote: any) => {
    return {
      id: vote.participant_id,
      value: vote.value,
      name: participantsMap[vote.participant_id] || "Участник",
    };
  });

  return (
    <div className="mt-4 flex flex-col gap-3">
      <Button
        value={showVotes ? "Скрыть карты" : "Показать голоса участников"}
        variant="accentLiner"
        onClick={() => setShowVotes(!showVotes)}
      />

      {showVotes && (
        <div className="p-5 border border-font-main/20 bg-card-bg/20 rounded-xl flex flex-col gap-4">
          <h5 className="text-xs text-font-muted uppercase font-bold tracking-wider">
            Результаты голосования:
          </h5>

          <div className="flex flex-wrap gap-4 justify-start">
            {enrichedVotes.map((vote: any, idx: number) => (
              <VoteItem
                key={vote.id || idx}
                name={vote.name}
                value={vote.value}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
