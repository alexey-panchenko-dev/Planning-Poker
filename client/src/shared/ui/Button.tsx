interface ButtonI {
  value?: string;
  variant?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const BtnVariants = {
  accent: "asldfka;sldf",
  danger: "asldfka;sldf",
  success: "asldfka;sldf",
};

export const Button = ({
  value,
  variant,
  type = "button",
  onClick,
}: ButtonI) => {
  return (
    <button
      className={`bg-blue-400 text-white
      py-2 px-4 rounded-xl ${variant}`}
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
