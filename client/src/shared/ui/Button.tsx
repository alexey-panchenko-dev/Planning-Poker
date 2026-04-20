interface ButtonI {
  value?: string;
  variant?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const BtnVariants: Record<string, string> = {
  accent: "bg-accent/70 hover:bg-accent text-font-main font-semibold",
  danger: "bg-danger/70 hover:bg-danger text-font-main font-semibold",
  ghost: "bg-danger/70 hover:bg-danger text-font-main font-semibold",

  accentLiner: "text-accent border border-accent hover:bg-accent/40",
};

export const Button = ({
  value,
  variant = "accent",
  type = "button",
  onClick,
  className,
}: ButtonI) => {
  return (
    <button
      className={`py-2 px-6 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${className} ${BtnVariants[variant] || ""}`}
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
