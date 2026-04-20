import { type RoomProps } from "../model/type";

export const RoomCard = ({
  name,
  description,
  active_task_title,
  participants_count,
}: RoomProps) => {
  return (
    <div className="relative group bg-main-bg/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:border-[#00c38b]/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase tracking-widest text-[#00c38b] font-bold bg-[#00c38b]/10 px-2 py-1 rounded">
          {active_task_title || "No active task"}
        </span>
        <span className="text-xs text-gray-500">
          {participants_count} players
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00c38b] transition-colors">
        {name}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-6">
        {description || "No description provided."}
      </p>
      <button className="w-full py-3 bg-[#00c38b] text-black font-bold rounded-xl active:scale-95 transition-transform hover:shadow-[0_0_15px_rgba(0,195,139,0.4)]">
        Присоединиться
      </button>
      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#00c38b]/50 to-transparent" />
    </div>
  );
};
