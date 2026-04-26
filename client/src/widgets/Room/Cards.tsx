import { useState } from "react";
import { Card } from "./Card";
import { useVotingStore } from "@/features/room/model/useVotingStore";

interface CardsProps {
  cards: string[];
}

export const Cards = ({ cards }: CardsProps) => {
  const { isVote, selectedTask, selectCard } = useVotingStore();

  return (
    <div
      className={`
      transition-transform duration-500 ease-in-out
      ${!isVote ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}
    `}
    >
      <div className="mb-6 text-center">
        <p className="text-font-muted text-sm uppercase tracking-widest">
          Ваша оценка:
          <span className="text-accent font-black ml-2 text-xl">
            {selectedTask ?? "—"}
          </span>
        </p>
      </div>

      <div className="flex gap-4 justify-center items-end min-w-max px-6 pb-8">
        {cards.map((cardValue) => (
          <Card
            key={cardValue}
            value={cardValue}
            isActive={selectedTask === cardValue}
            onClick={() => selectCard(cardValue)}
          />
        ))}
      </div>
    </div>
  );
};
