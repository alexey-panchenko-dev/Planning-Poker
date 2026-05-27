import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { CopyField } from "@/features/room/ui/CopyField";
import { Star, Users, Wifi, WifiOff, Hash, Link } from "lucide-react";
import { IParticipant, IRoomSnapshot } from "@/entities/room/model/types";

interface PCardI {
  id: string;
  name: string;
  is_online: boolean;
}

export const PCard = ({ id, name, is_online }: PCardI) => {
  return (
    <div
      key={id}
      className={`
        px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-300
        border group
        ${
          is_online
            ? "bg-accent/5 border-accent/20 hover:bg-accent/10 hover:border-accent/40 shadow-sm shadow-accent/5"
            : "bg-main-bg/10 border-font-muted/10 hover:bg-main-bg/20 hover:border-font-muted/30"
        }
      `}
    >
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full bg-font-muted/10 flex items-center justify-center border border-font-muted/5 group-hover:border-font-muted/20 transition-colors">
          <span className="text-[13px] font-semibold text-font-main uppercase tracking-tight">
            {name?.[0] ?? "?"}
          </span>
        </div>
        {is_online && (
          <>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent animate-ping opacity-75" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border border-card-bg shadow-sm" />
          </>
        )}
        {!is_online && (
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-font-muted/40 border border-card-bg" />
        )}
      </div>
      <span className="text-[15px] font-medium text-font-main/90 truncate flex-1 tracking-tight">
        {name}
      </span>
      {is_online ? (
        <Wifi size={14} className="text-accent/60 group-hover:text-accent transition-colors shrink-0" />
      ) : (
        <WifiOff size={14} className="text-font-muted/40 shrink-0" />
      )}
    </div>
  );
};

interface IParticipants {
  snapshot: IRoomSnapshot | undefined;
}

export const Participants = ({ snapshot }: IParticipants) => {
  const user = useSessionStore((state) => state.user);
  const owner = snapshot?.participants?.find(
    (p) => p.user_id === snapshot.room.owner_id,
  );
  const participants = snapshot?.participants || [];
  const participantsOnline = participants.filter((p) => p.is_online);
  const participantsOffline = participants.filter((p) => !p.is_online);
  const isOwner = !!user && snapshot?.room?.owner_id === user.id;

  const inviteLink = snapshot?.room?.invite_link || "";
  const roomCode = inviteLink.includes("/invite/")
    ? inviteLink.split("/invite/")[1]?.split(/[/?#]/)[0]
    : snapshot?.room?.id || "";

  return (
    <div className="flex-1 w-full p-6 border border-font-main/15 bg-card-bg/20 rounded-2xl flex flex-col gap-5 justify-center backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0 border border-accent/20 shadow-inner">
          <Star size={16} className="text-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50 leading-none mb-1.5">
            Владелец
          </span>
          <span className="text-base font-semibold text-font-main leading-none tracking-tight">
            {owner?.name ?? "Не определён"}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-font-muted/20 via-font-muted/10 to-transparent" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Users size={16} className="text-font-muted/40" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50">
            Участники
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-accent/80">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            {participantsOnline.length} онлайн
          </span>
          <span className="flex items-center gap-1.5 text-font-muted/50">
            <span className="w-1.5 h-1.5 rounded-full bg-font-muted/30" />
            {participantsOffline.length} офлайн
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {participantsOnline.map((p) => (
          <PCard key={p.id} id={p.id} name={p.name} is_online={p.is_online} />
        ))}
        {participantsOffline.map((p) => (
          <PCard key={p.id} id={p.id} name={p.name} is_online={p.is_online} />
        ))}
      </div>

      {isOwner && (
        <>
          <div className="h-px w-full bg-gradient-to-r from-font-muted/20 via-font-muted/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50 ml-1">
                Ссылка для входа
              </span>
              <CopyField text={inviteLink} icon={<Link size={14} />} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-font-muted/50 ml-1">
                Код комнаты
              </span>
              <CopyField text={roomCode} icon={<Hash size={14} />} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

