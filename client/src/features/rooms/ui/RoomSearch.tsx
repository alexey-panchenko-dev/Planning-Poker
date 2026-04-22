import { Search } from "lucide-react";
import { Input } from "@/shared/ui/Input";

interface RoomSearchI {
  value: string;
  onChange: (value: string) => void;
}

export const RoomSearch = ({ value, onChange }: RoomSearchI) => {
  return (
    <div className="relative w-full max-w-[700px]">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-font-muted pointer-events-none z-10">
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск по названию или описанию..."
        className="w-full bg-card-bg/40 border border-white/[0.05] focus:border-accent/50 text-font-main rounded-2xl py-3 pl-12 pr-4 outline-none transition-all placeholder:text-font-muted/50"
      />
    </div>
  );
};
