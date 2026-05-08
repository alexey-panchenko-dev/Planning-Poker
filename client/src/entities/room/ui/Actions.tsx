import { startRound, revealRound } from "../api/roomVote.api";
import { Button } from "@/shared";

interface ActionsProps {
  roomId: any;
  selectedTaskId: any;
  roundId: any;
  isVotingActive: boolean;
  setIsFModal: (val: boolean) => void;
  setIsRevealModal: (val: boolean) => void;
}

export const Actions = ({
  roomId,
  selectedTaskId,
  roundId,
  isVotingActive,
  setIsFModal,
  setIsRevealModal,
}: ActionsProps) => {
  const handleStartRound = async () => {
    if (!roomId || !selectedTaskId) return;
    try {
      await startRound(roomId, selectedTaskId);
    } catch (error) {
      console.error("Ошибка старта раунда:", error);
    }
  };

  const handleRevealRound = async () => {
    if (!roomId || !roundId) return;
    try {
      await revealRound(roomId, roundId);
      setIsRevealModal(true);
    } catch (error) {
      console.error("Ошибка раскрытия карт:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleStartRound}
        variant="accentLiner"
        className="text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6"
        value={isVotingActive ? "Перезапустить" : "Начать раунд"}
      />
      <Button
        onClick={handleRevealRound}
        variant={isVotingActive ? "accent" : "accentLiner"}
        className={`text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6 transition-all duration-300 ${
          !isVotingActive ? "opacity-50 grayscale cursor-not-allowed" : ""
        }`}
        value="Раскрыть карты"
      />
      <Button
        onClick={() => setIsFModal(true)}
        variant={isVotingActive ? "accent" : "accentLiner"}
        className={`text-[10px] uppercase tracking-[0.2em] font-bold py-3 px-6 transition-all duration-300 ${
          !isVotingActive ? "opacity-50 grayscale cursor-not-allowed" : ""
        }`}
        value="Закончить раунд"
      />
    </div>
  );
};
