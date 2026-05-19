import { useState } from "react";
import { Check, Copy, Link } from "lucide-react";

export const CopyField = ({ snapshot }: { snapshot: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snapshot?.room.invite_link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className="
          group relative flex items-center justify-between gap-3
          bg-main-bg border border-font-muted/10 rounded-2xl
          px-4 py-3 cursor-pointer
          hover:border-accent/40 hover:bg-accent/5
          transition-all duration-200
        "
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-accent/60 group-hover:text-accent transition-colors duration-200 shrink-0">
          <Link size={15} />
        </span>
        <span className="text-font-main text-sm font-mono truncate">
          {snapshot?.room.invite_link}
        </span>
      </div>

      <span
        className="
            shrink-0 text-font-muted group-hover:text-accent
            transition-all duration-200
          "
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </span>

      {copied && (
        <span
          className="
              absolute -top-8 left-1/2 -translate-x-1/2
              bg-card-bg border border-font-muted/10 text-font-main
              text-xs px-2.5 py-1 rounded-full shadow-lg
              animate-in fade-in zoom-in-95 duration-150
            "
        >
          Скопировано!
        </span>
      )}
    </div>
  );
};
