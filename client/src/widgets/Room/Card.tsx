import { Coffee } from "lucide-react";

interface CardProps {
  value: number | string;
  isActive: boolean;
  onClick: () => void;
}

const variants = {
  active:
    "bg-accent/10 border-accent text-accent -translate-y-3 shadow-[0_10px_20px_rgba(16,185,129,0.1)]",
  notActive: "bg-card-bg border-white/5 text-font-muted hover:border-white/20 ",
};

export const Card = ({ value, isActive, onClick }: CardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center justify-center
        h-20 w-15 rounded-2xl border-2
        font-bold text-xl transition-all duration-200
        active:scale-95 cursor-pointer
        ${isActive ? variants.active : variants.notActive}
      `}
    >
      {value === "relax" || value === "break" ? <Coffee /> : value}

      {isActive && (
        <div className="absolute -bottom-1 w-8 h-1 bg-accent rounded-full " />
      )}
    </button>
  );
};
