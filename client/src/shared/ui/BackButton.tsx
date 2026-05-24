import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  path: string;
}

export const BackButton = ({ path }: BackButtonProps) => {
  return (
    <Link to={`/${path}`} className="inline-block my-3 select-none">
      <button
        type="button"
        className="
          group flex items-center gap-2 px-4 py-2.5 
          bg-main-bg border-[0.5px] border-font-muted/20 hover:border-accen
          text-font-muted hover:text-accent backdrop-blur-md
          rounded-xl text-[14px] font-medium
          cursor-pointer transition-all duration-300 outline-none
        "
      >
        <ChevronLeft
          size={16}
          className="transform group-hover:-translate-x-0.5 transition-transform duration-300 text-text-muted group-hover:text-accent"
        />
        <span>Назад</span>
      </button>
    </Link>
  );
};
