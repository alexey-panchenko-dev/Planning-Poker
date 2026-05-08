import { useState } from "react";
import { finalizeRound } from "../api/roomVote.api";
import { Modal, Button } from "@/shared";

interface IFinalizeModal {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  roundId: string;
  availableCards: string[];
}

export const FinalizeRoundModal = ({
  isOpen,
  onClose,
  roomId,
  roundId,
  availableCards,
}: IFinalizeModal) => {
  // Состояние для хранения выбранного значения
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!roomId || !roundId || !selectedValue) return;

    setIsLoading(true);
    try {
      // ВНИМАНИЕ: Проверь сигнатуру API. Скорее всего, нужно передавать объект.
      // Если бэкенд ждет объект, то: { estimate_value: selectedValue }
      await finalizeRound(roomId, roundId, selectedValue);

      onClose(); // Закрываем модалку только при успехе
      setSelectedValue(null); // Сбрасываем выбор
    } catch (error) {
      console.error("Ошибка финализации:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Выберите итоговую оценку">
      <div className="flex flex-col gap-8">
        {/* Сетка карт */}
        <div className="grid grid-cols-3 gap-3">
          {availableCards.map((card) => (
            <button
              key={card}
              onClick={() => setSelectedValue(card)}
              className={`p-4 rounded-xl border transition-all duration-200 font-bold text-lg
                ${
                  selectedValue === card
                    ? "border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                    : "border-font-muted/10 bg-font-muted/5 text-font-main hover:border-font-muted/30"
                }`}
            >
              {card}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleConfirm}
            disabled={!selectedValue || isLoading}
            variant="accent"
            className="w-full py-4 text-[12px] uppercase tracking-[0.2em] font-black"
            value={isLoading ? "Сохранение..." : "Подтвердить результат"}
          />

          {selectedValue && (
            <p className="text-[10px] text-accent uppercase tracking-widest font-medium animate-pulse">
              Выбрано значение: {selectedValue}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
