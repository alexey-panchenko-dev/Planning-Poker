import { useState } from "react";
import { Card } from "./Card";

interface CardsProps {
  cards: string[];
}

export const Cards = ({ cards }: CardsProps) => {
  const [activeValue, setActiveValue] = useState<number | string | null>(null);

  const handleCardClick = (value: number | string) => {
    setActiveValue((prev) => (prev === value ? null : value));
  };

  return (
    <div className="w-full py-10 overflow-x-auto">
      <div className="flex gap-4 justify-center items-end min-w-max px-6">
        {cards.map((cardValue) => (
          <Card
            key={cardValue}
            value={cardValue}
            isActive={activeValue === cardValue}
            onClick={() => handleCardClick(cardValue)}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        {activeValue !== null && (
          <p className="text-font-muted">
            Выбрано:{" "}
            <span className="text-accent font-bold">{activeValue}</span>
          </p>
        )}
      </div>
    </div>
  );
};
