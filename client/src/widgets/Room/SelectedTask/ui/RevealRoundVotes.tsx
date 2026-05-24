import { useState } from "react";
import { VoitingCard } from "../../VoitingDesk/VoitingCard";
import { FinalizeRound } from "@/features/selectedTask/ui/FinalizeRound";

interface IRevRoundVotesProps {
  snapshot: any;
  activeRound: any;
  id: string | undefined;
  isOwner: boolean;
}

const VoteItem = ({ name, value }: { name: string; value: string }) => (
  <div className="p-4 bg-card-bg/20 border border-font-muted/20 rounded-2xl flex flex-col items-center justify-between gap-3 min-w-[100px] transition-all duration-300 hover:-translate-y-1 hover:border-font-muted/50">
    <p className="text-xs text-font-main font-semibold truncate w-full text-center">
      {name}
    </p>
    <VoitingCard
      val={value ? value : "X"}
      isActive={!!value}
      isDisabled={true}
    />
  </div>
);

export const RevealRoundVotes = ({
  snapshot,
  activeRound,
  id,
  isOwner,
}: IRevRoundVotesProps) => {
  const [tab, setTab] = useState<"votes" | "finalize">("votes");

  if (activeRound?.status !== "revealed") return null;

  const participants = snapshot?.participants || [];
  const votes = activeRound?.votes || [];

  const participantsMap: Record<string, string> = {};
  participants.forEach((p: any) => {
    participantsMap[p.id] = p.name;
  });

  const enrichedVotes = votes.map((vote: any) => ({
    id: vote.participant_id,
    value: vote.value,
    name: participantsMap[vote.participant_id] || "Участник",
  }));

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* Вкладки — только овнер видит Финализацию */}
      {isOwner && (
        <div className="flex gap-1 bg-inner-bg/50 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setTab("votes")}
            className={`flex-1 text-xs py-1.5 rounded-lg transition-all font-medium ${
              tab === "votes"
                ? "bg-accent/20 text-accent"
                : "text-font-muted/60 hover:text-font-muted"
            }`}
          >
            Голоса
          </button>
          <button
            onClick={() => setTab("finalize")}
            className={`flex-1 text-xs py-1.5 rounded-lg transition-all font-medium ${
              tab === "finalize"
                ? "bg-accent/20 text-accent"
                : "text-font-muted/60 hover:text-font-muted"
            }`}
          >
            Финализация
          </button>
        </div>
      )}

      {/* Голоса — всем, всегда */}
      {(tab === "votes" || !isOwner) && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            {enrichedVotes.map((vote: any, idx: number) => (
              <VoteItem
                key={vote.id || idx}
                name={vote.name}
                value={vote.value}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            {activeRound.average_score != null && (
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-inner-bg/60 border border-white/5 text-font-muted/70">
                Среднее:{" "}
                <span className="text-font-main font-medium">
                  {activeRound.average_score}
                </span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Финализация — только овнер */}
      {isOwner && tab === "finalize" && (
        <FinalizeRound snapshot={snapshot} activeRound={activeRound} id={id} />
      )}
    </div>
  );
};
