export const VoitingCard = ({
  val,
  isActive,
  isDisabled,
  onClick,
}: {
  val: any;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (val: string) => void;
}) => {
  return (
    <button
      onClick={() => !isDisabled && onClick?.(val)}
      disabled={isDisabled && !isActive}
      className={`
        w-12 h-18 rounded-xl text-base font-medium
        transition-all duration-300 ease-out antialiased
        border
        ${
          isDisabled
            ? isActive
              ? "border-accent bg-accent/15 text-accent -translate-y-1 shadow-lg shadow-accent/15 font-semibold cursor-default"
              : "bg-card-bg/10 border-font-muted/20 text-font-muted/30 cursor-not-allowed"
            : isActive
              ? "border-accent bg-accent/15 text-accent -translate-y-1 shadow-lg shadow-accent/15 font-semibold cursor-pointer"
              : "bg-card-bg/30 border-font-muted/10 text-font-muted cursor-pointer hover:border-font-muted/40 hover:bg-card-bg/40 hover:-translate-y-0.5"
        }
      `}
    >
      {val}
    </button>
  );
};
