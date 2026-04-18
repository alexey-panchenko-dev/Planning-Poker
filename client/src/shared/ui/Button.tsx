interface ButtonI {
  value?: string;
  variant?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const BtnVariants: Record<string, string> = {
  primary: "bg-[#00c38b] hover:bg-[#00a375] text-black font-semibold",
  outline:
    "bg-transparent border border-gray-600 text-white hover:border-gray-400",
};

export const Button = ({
  value,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonI) => {
  return (
    <button
      className={`py-2 px-6 rounded-xl transition-all active:scale-95 ${BtnVariants[variant]}`}
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
