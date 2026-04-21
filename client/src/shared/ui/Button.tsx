import { ReactNode } from "react";

interface ButtonI {
  value?: ReactNode;
  variant?: "accent" | "danger" | "ghost" | "accentLiner";
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const BtnVariants: Record<string, string> = {
  accent:
    "bg-accent/70 hover:bg-accent text-font-main font-semibold shadow-lg shadow-accent/10",
  danger: "bg-danger/70 hover:bg-danger text-font-main font-semibold",
  ghost:
    "bg-card-bg hover:bg-ghost/20 text-font-muted hover:text-font-main border border-font-muted/10",
  accentLiner:
    "text-accent border border-accent hover:bg-accent/10 hover:border-accent shadow-sm",
};

export const Button = ({
  value,
  variant = "accent",
  type = "button",
  onClick,
  className = "",
}: ButtonI) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center 
        py-2 px-6 rounded-full 
        transition-all duration-200 
        active:scale-95 cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${BtnVariants[variant] || ""}
        ${className}
      `}
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
