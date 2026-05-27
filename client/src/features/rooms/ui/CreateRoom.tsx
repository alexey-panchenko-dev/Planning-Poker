import { useState, useRef, useEffect } from "react";
import { useCreateRoom } from "@/features/rooms/model/useCreateRoom";
import { Button, Input } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { getDeckPresets } from "@/entities/room/api/room.api";
import { Layers, Check, ChevronDown } from "lucide-react";

export const CreateRoom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("fibonacci");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useCreateRoom();

  const { data: decks } = useQuery({
    queryKey: ["deck-presets"],
    queryFn: getDeckPresets,
  });

  const currentDeck = decks?.find((d: any) => d.code === selectedDeck);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          label="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название комнаты..."
        />
        <Input
          label="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание комнаты..."
        />
      </div>

      <div className="space-y-2 relative" ref={dropdownRef}>
        <label className="text-xs font-bold text-font-muted uppercase tracking-widest ml-1">
          Выберите колоду
        </label>

        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`
            flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer bg-white/[0.02]
            ${isDropdownOpen ? "border-accent bg-accent/5" : "border-font-muted/10 hover:border-font-muted/20"}
          `}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-font-muted/10 text-font-muted rounded-xl shrink-0">
              <Layers size={18} className={currentDeck ? "text-accent" : ""} />
            </div>
            <div className="text-left min-w-0">
              <h4 className="font-bold text-font-main text-sm truncate">
                {currentDeck ? currentDeck.name : "Загрузка колод..."}
              </h4>
              {currentDeck?.description && (
                <p className="text-[11px] text-font-muted truncate mt-0.5">
                  {currentDeck.description}
                </p>
              )}
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-font-muted transition-transform duration-200 shrink-0 ml-2 ${
              isDropdownOpen ? "rotate-180 text-accent" : ""
            }`}
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-main-bg border border-font-muted/20 rounded-2xl shadow-2xl z-50 p-2 flex flex-col gap-1 max-h-[260px] overflow-y-auto rooms-scroll backdrop-blur-xl bg-main-bg/95">
            {decks?.map((deck: any) => {
              const isSelected = selectedDeck === deck.code;
              return (
                <div
                  key={deck.code}
                  onClick={() => {
                    setSelectedDeck(deck.code);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    relative flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer
                    ${
                      isSelected
                        ? "border-accent/30 bg-accent/10"
                        : "border-transparent hover:bg-white/[0.03] hover:border-font-muted/10"
                    }
                  `}
                >
                  <div
                    className={`
                      p-2 rounded-xl shrink-0
                      ${isSelected ? "bg-accent text-font-main" : "bg-font-muted/10 text-font-muted"}
                    `}
                  >
                    <Layers size={16} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-font-main text-sm truncate">
                      {deck.name}
                    </h4>

                    <div className="flex gap-1 flex-wrap">
                      {deck.cards.slice(0, 5).map((card: any) => (
                        <span
                          key={card}
                          className="text-[10px] bg-font-muted/10 px-1.5 py-0.5 rounded text-font-muted font-mono"
                        >
                          {card}
                        </span>
                      ))}
                      {deck.cards.length > 5 && (
                        <span className="text-[10px] text-font-muted font-mono">
                          ...
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="bg-accent rounded-full p-1 text-font-main shrink-0">
                      <Check size={12} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Button
        type="submit"
        value={isPending ? "Создание..." : "Создать комнату"}
        variant="accent"
        className="w-full rounded-xl mt-2"
      />
    </form>
  );
};
