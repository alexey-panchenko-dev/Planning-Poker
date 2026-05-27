import { VoitingCard } from "@/widgets/Room/VoitingDesk/VoitingCard";
import { useState } from "react";
import { Input, Button } from "@/shared";
import { useRoomActions } from "@/entities/room/api/roomVote.api";

export const FinalizeRound = ({
  snapshot,
  id,
  activeRound,
}: {
  snapshot: any;
  id: string | undefined;
  activeRound: any;
}) => {
  const actions = useRoomActions(id);
  const [value, setValue] = useState<string>(activeRound?.suggested_result || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardValues: string[] = snapshot?.room?.deck?.cards ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val.length <= 3) {
      setValue(val);
    }
  };

  const handleFinalize = async () => {
    if (!value || isSubmitting || !activeRound?.id) return;
    setIsSubmitting(true);
    try {
      await actions.finalize(activeRound.id, value);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-2 px-3 w-full">
      <p className="text-sm text-font-muted text-center leading-normal">
        Финализация раунда — выберите или введите итоговую оценку
      </p>

      {cardValues.length === 0 ? (
        <p className="text-font-muted text-sm">Карточки не найдены</p>
      ) : (
        <div className="flex gap-2 justify-center items-end flex-wrap">
          {cardValues.map((val: string) => (
            <VoitingCard
              key={val}
              val={val}
              isActive={val.toUpperCase() === value.toUpperCase()}
              onClick={(v) => setValue(v.toUpperCase())}
            />
          ))}
        </div>
      )}

      <div className="flex items-end gap-3 w-full p-4">
        <div className="flex-1">
          <Input
            label="Или введите вручную"
            value={value}
            onChange={(e) => handleChange(e)}
            placeholder="Например: 5, 13, ?"
          />
        </div>
        <Button
          disabled={!value || isSubmitting}
          value={isSubmitting ? "..." : "Утвердить"}
          onClick={handleFinalize}
          variant="accent"
        />
      </div>
    </div>
  );
};
