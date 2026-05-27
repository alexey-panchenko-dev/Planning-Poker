import { useState, ReactNode } from "react";
import { Check, Copy, Link } from "lucide-react";

interface CopyFieldProps {
  text: string;
  icon?: ReactNode;
}

export const CopyField = ({
  text,
  icon = <Link size={15} />,
}: CopyFieldProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Не удалось скопировать текст:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="
        group relative flex items-center justify-between gap-3
        bg-main-bg border border-font-muted/10 rounded-2xl
        px-4 py-3 cursor-pointer
        hover:border-accent/40 hover:bg-accent/5
        transition-all duration-200 w-full
      "
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="text-accent/60 group-hover:text-accent transition-colors duration-200 shrink-0">
          {icon}
        </span>
        <span className="text-font-main text-sm font-mono truncate flex-1 select-all">
          {text || "Пусто"}
        </span>
      </div>

      <span
        className="
          shrink-0 text-font-muted group-hover:text-accent
          transition-all duration-200
        "
      >
        {copied ? (
          <Check size={16} className="text-accent" />
        ) : (
          <Copy size={16} />
        )}
      </span>

      {copied && (
        <span
          className="
            absolute -top-8 left-1/2 -translate-x-1/2 z-10
            bg-card-bg border border-font-muted/10 text-font-main
            text-xs px-2.5 py-1 rounded-full shadow-lg
            animate-in fade-in zoom-in-95 duration-150
          "
        >
          Скопировано!
        </span>
      )}
    </button>
  );
};
