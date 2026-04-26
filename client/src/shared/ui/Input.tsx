import React from "react";

export interface InputI {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  variant?: "default1" | "default2";
}

const InpVariants: Record<string, string> = {
  default1: "bg-main-bg",
  default2: "bg-card-bg",
};

export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  variant = "default1",
}: InputI) => {
  const baseStyles =
    "w-full py-2 px-4 rounded-xl outline-none text-font-main focus:ring-1 focus:ring-accent/50 transition-all border";
  const borderStyles = error ? "border-danger border-2" : "border-white/5";
  const variantStyles = InpVariants[variant];

  return (
    <div className="flex flex-col items-start w-full gap-1">
      {label && <label className="text-sm text-font-muted ml-1">{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${borderStyles} ${variantStyles}`}
      />

      {error && <p className="text-xs text-danger mt-1 ml-1">{error}</p>}
    </div>
  );
};
