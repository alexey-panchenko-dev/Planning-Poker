import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const BackButton = ({ path }: { path: string }) => {
  return (
    <Link to={`/${path}`}>
      <div className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-300 my-3">
        <ChevronLeft />
        <p>Назад</p>
      </div>
    </Link>
  );
};
