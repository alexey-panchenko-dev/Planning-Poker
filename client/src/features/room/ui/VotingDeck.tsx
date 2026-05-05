import { submitVote } from "@/entities/room/api/roomVote.api";
import { useVotingStore } from "@/features/room/model/useVotingStore";
import { Button } from "@/shared";
import { Card } from "@/widgets/Room/Card";

interface VotingDeckProps {
  roomId: string;
  roundId: string;
  availableCards: string[];
}

export const VotingDeck = ({
  roomId,
  roundId,
  availableCards,
}: VotingDeckProps) => {
  const { selectedTask: myVote, selectCard } = useVotingStore();

  const handleClickDone = () => {
    if (!myVote) {
      return;
    }

    const voteValue = String(myVote);
    submitVote(roomId, roundId, voteValue);
  };

  return (
    <div className="flex w-full flex-col items-center px-4 md:px-12">
      <div className="mb-6 flex w-full items-center justify-between max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          {!myVote
            ? "Выберите номинал"
            : myVote === "break"
              ? "Выбрано: Отдых"
              : `Выбрано: ${myVote}`}
        </p>

        <Button
          onClick={handleClickDone}
          disabled={!myVote}
          value="Подтвердить"
          className="py-2 px-8 text-[10px] uppercase tracking-widest font-bold"
        />
      </div>

      <div className="flex w-full items-end justify-center gap-4 overflow-x-auto py-4 no-scrollbar max-w-5xl">
        {availableCards.map((value) => (
          <div key={value} className="shrink-0">
            <Card
              value={value}
              isActive={myVote === value}
              onClick={() => selectCard(value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
