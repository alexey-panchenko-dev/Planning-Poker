import React from "react";

interface InputI {
  label?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}: InputI) => {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      {label && <label className="text-sm text-gray-300 ml-1">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${error ? "border-2 border-red-500" : "border-none"}
          bg-gray-600 text-white w-full
          py-2 px-4 rounded-xl outline-none
          focus:ring-2 focus:ring-blue-400 transition-all
        `}
      />
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};
