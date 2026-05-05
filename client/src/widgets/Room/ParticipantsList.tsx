import { useRoomStore } from "@/entities/room/model/useRoomStore";
import { User } from "lucide-react";

export const ParticipantsList = () => {
  const participants = useRoomStore((s) => s.participants);

  const onlineCount = participants.filter((p) => p.is_online).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] uppercase tracking-widest text-font-muted font-bold">
          Участники ({onlineCount}/{participants.length})
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {participants.map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
              ${p.is_online 
                ? "bg-accent/5 border-accent/20 text-font-main shadow-sm shadow-accent/5" 
                : "bg-font-muted/5 border-font-muted/10 text-font-muted opacity-60"
              }`}
          >
            <div className={`w-2 h-2 rounded-full ${p.is_online ? "bg-accent animate-pulse" : "bg-font-muted"}`} />
            <User size={14} className={p.is_online ? "text-accent" : "text-font-muted"} />
            <span className="text-sm font-medium tracking-tight">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
