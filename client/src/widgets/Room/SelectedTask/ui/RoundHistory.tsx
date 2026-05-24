import { IRoomSnapshot } from "@/entities/room/model/types";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const RoundHistory = ({
  snapshot,
  taskId,
}: {
  snapshot: IRoomSnapshot;
  taskId: string | undefined;
}) => {
  const history = snapshot?.history?.filter((h: any) => h.task_id === taskId);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!history || history.length === 0) return null;

  const nextSlide = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentRound = history[currentIndex];

  return (
    <div className="flex flex-col gap-2 mt-2 w-full">
      <div className="flex items-center justify-between">
        <span className="text-[13px] uppercase tracking-widest text-font-muted/60 font-medium">
          История раундов
        </span>
        {history.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-1 rounded-lg text-font-muted/40 hover:text-accent hover:bg-accent/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-font-muted/50 font-mono">
              {currentIndex + 1}/{history.length}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentIndex === history.length - 1}
              className="p-1 rounded-lg text-font-muted/40 hover:text-accent hover:bg-accent/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden bg-inner-bg/40 p-3 rounded-xl border border-font-main/5 flex items-center justify-between h-11 min-h-11">
        <span className="text-font-muted/80 text-base font-medium">
          Раунд {currentIndex + 1}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-font-muted/40">Итог:</span>
          <span className="text-accent font-semibold text-lg bg-accent/5 px-2.5 py-0.5 rounded-lg border border-accent/20">
            {currentRound?.result_value}
          </span>
        </div>
      </div>
    </div>
  );
};
