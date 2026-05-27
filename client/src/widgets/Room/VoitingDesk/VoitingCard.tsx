export const VoitingCard = ({
  val,
  isActive,
  isDisabled,
  onClick,
}: {
  val: string | number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (val: string) => void;
}) => {
  return (
    <button
      onClick={() => !isDisabled && onClick?.(String(val))}
      disabled={isDisabled && !isActive}
      className={`
        w-14 h-20 rounded-2xl text-xl font-bold
        transition-all duration-300 ease-out antialiased
        border flex items-center justify-center
        ${
          isDisabled
            ? isActive
              ? "border-accent bg-accent/20 text-font-main -translate-y-1 shadow-lg shadow-accent/20 font-bold cursor-default"
              : "bg-card-bg/10 border-font-muted/10 text-font-muted/20 cursor-not-allowed"
            : isActive
              ? "border-accent bg-accent/20 text-font-main -translate-y-1.5 shadow-xl shadow-accent/30 font-bold cursor-pointer ring-2 ring-accent/20"
              : "bg-card-bg/40 border-font-main/10 text-font-muted/80 cursor-pointer hover:border-font-muted/40 hover:bg-card-bg/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 active:scale-95"
        }
      `}
    >
      {val}
    </button>
  );
};

