import { ReactNode } from "react";

interface ButtonI {
  value?: ReactNode;
  variant?: "accent" | "danger" | "ghost" | "accentLiner";
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

const BtnVariants: Record<string, string> = {
  accent:
    "bg-accent/70 enabled:hover:bg-accent text-font-main font-semibold shadow-lg shadow-accent/10",
  danger: "bg-danger/70 enabled:hover:bg-danger text-font-main font-semibold",
  ghost:
    "bg-card-bg enabled:hover:bg-ghost/20 text-font-muted enabled:hover:text-font-main border border-font-muted/10",
  accentLiner:
    "text-accent border border-accent enabled:hover:bg-accent/10 enabled:hover:border-accent shadow-sm",
};

export const Button = ({
  value,
  variant = "accent",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonI) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center 
        py-2 px-6 rounded-full 
        transition-all duration-200 
        /* Добавляем enabled: перед эффектами, чтобы они не работали при дизейбле */
        enabled:active:scale-95 enabled:cursor-pointer 
        disabled:opacity-40 disabled:cursor-not-allowed disabled:grayscale-[0.5]
        ${BtnVariants[variant] || ""}
        ${className}
      `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};
