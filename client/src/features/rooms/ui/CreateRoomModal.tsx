import { useState } from "react";
import { useCreateRoom } from "@/features/rooms/model/useCreateRoom";
import { Button, Input } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { getDeckPresets } from "@/entities/room/api/room.api";
import { Layers, Check } from "lucide-react";

export const CreateRoomModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("fibonacci");

  const { mutate, isPending } = useCreateRoom();

  const { data: decks } = useQuery({
    queryKey: ["deck-presets"],
    queryFn: getDeckPresets,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, description, deck_preset_code: selectedDeck },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
          setSelectedDeck("fibonacci");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="space-y-4">
        <Input
          label="Название комнаты"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="например: SPRINT PLANNING #42"
        />
        <Input
          label="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="О чем будем договариваться?"
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-font-muted uppercase tracking-widest ml-1">
          Выберите колоду
        </label>
        <div className="flex flex-col gap-2 mt-2">
          {decks?.map((deck: any) => (
            <div
              key={deck.code}
              onClick={() => setSelectedDeck(deck.code)}
              className={`
                relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer
                ${
                  selectedDeck === deck.code
                    ? "border-accent bg-accent/5"
                    : "border-font-muted/5 bg-white/[0.02] hover:border-font-muted/20"
                }
              `}
            >
              <div
                className={`
                  p-2 rounded-xl shrink-0
                  ${selectedDeck === deck.code ? "bg-accent text-font-main" : "bg-font-muted/10 text-font-muted"}
                `}
              >
                <Layers size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-font-main text-sm">
                  {deck.name}
                </h4>
                <p className="text-[11px] text-font-muted line-clamp-1 mb-1">
                  {deck.description}
                </p>
                <div className="flex gap-1 flex-wrap">
                  {deck.cards.slice(0, 5).map((card: any) => (
                    <span
                      key={card}
                      className="text-[10px] bg-font-muted/10 px-1.5 py-0.5 rounded text-font-muted font-mono"
                    >
                      {card}
                    </span>
                  ))}
                  <span className="text-[10px] text-font-muted font-mono">
                    ...
                  </span>
                </div>
              </div>

              {selectedDeck === deck.code && (
                <div className="bg-accent rounded-full p-1 text-font-main shrink-0">
                  <Check size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        value={isPending ? "Создание..." : "Создать сессию"}
        variant="accent"
        className="w-full rounded-xl"
      />
    </form>
  );
};
