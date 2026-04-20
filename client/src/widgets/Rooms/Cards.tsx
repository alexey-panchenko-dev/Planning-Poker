import { useState } from "react";
import { FIBONACCI } from "@/entities/room/model/constants";
import { Card } from "./Card";

export const Cards = () => {
  const [activeValue, setActiveValue] = useState<number | string | null>(null);

  const handleCardClick = (value: number | string) => {
    setActiveValue((prev) => (prev === value ? null : value));
  };

  return (
    <div className="w-full py-10 overflow-x-auto">
      <div className="flex gap-4 justify-center items-end min-w-max px-6">
        {FIBONACCI.map((card) => (
          <Card
            key={card.value}
            value={card.value}
            isActive={activeValue === card.value}
            onClick={() => handleCardClick(card.value)}
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
