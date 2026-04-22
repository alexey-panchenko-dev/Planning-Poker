import { useState } from "react";
import { useCreateRoom } from "@/features/rooms/model/useCreateRoom";
import { Button, Input, Modal } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { getDeckPresets } from "@/features/rooms/model/roomsApi";
import { Layers, Check } from "lucide-react";

export const CreateRoomModal = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("fibonacci");
  
  const { mutate, isPending } = useCreateRoom();
  
  const { data: decks } = useQuery({
    queryKey: ["deck-presets"],
    queryFn: getDeckPresets,
    enabled: isOpen,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, description, deck_preset_code: selectedDeck },
      {
        onSuccess: () => {
          onClose();
          setName("");
          setDescription("");
          setSelectedDeck("fibonacci");
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Новая сессия">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-4">
          <Input
            label="Название комнаты"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
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
          <div className="grid grid-cols-1 gap-3">
            {decks?.map((deck) => (
              <div
                key={deck.code}
                onClick={() => setSelectedDeck(deck.code)}
                className={`
                  relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer
                  ${
                    selectedDeck === deck.code
                      ? "border-accent bg-accent/5"
                      : "border-font-muted/5 bg-ghost/5 hover:border-font-muted/20"
                  }
                `}
              >
                <div className={`
                  p-2 rounded-xl 
                  ${selectedDeck === deck.code ? "bg-accent text-font-main" : "bg-font-muted/10 text-font-muted"}
                `}>
                  <Layers size={20} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-font-main text-sm">{deck.name}</h4>
                  <p className="text-[11px] text-font-muted line-clamp-1">{deck.description}</p>
                </div>

                {selectedDeck === deck.code && (
                  <div className="bg-accent rounded-full p-1 text-font-main">
                    <Check size={14} />
                  </div>
                )}

                <div className="flex gap-1 ml-2">
                   {deck.cards.slice(0, 3).map(card => (
                     <span key={card} className="text-[10px] bg-font-muted/10 px-1.5 py-0.5 rounded text-font-muted font-mono">
                       {card}
                     </span>
                   ))}
                   <span className="text-[10px] text-font-muted font-mono">...</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            value="Отмена"
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-2xl"
          />
          <Button
            type="submit"
            value={isPending ? "Создание..." : "Создать сессию"}
            variant="accent"
            className="flex-1 rounded-2xl"
          />
        </div>
      </form>
    </Modal>
  );
};
