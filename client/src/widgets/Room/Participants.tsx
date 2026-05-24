import { CopyField } from "@/features/room/ui/CopyField";
import { Star, Users, Wifi, WifiOff } from "lucide-react";

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
        px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200
        border hover:-translate-y-0.5
        ${
          is_online
            ? "bg-accent/10 border-accent/30 hover:bg-accent/20 hover:border-accent/60"
            : "bg-main-bg/10 border-font-muted/15 hover:bg-main-bg/20 hover:border-font-muted/40"
        }
      `}
    >
      <div className="relative shrink-0">
        <div className="w-7 h-7 rounded-full bg-font-muted/20 flex items-center justify-center">
          <span className="text-xs font-medium text-font-main uppercase">
            {name?.[0] ?? "?"}
          </span>
        </div>
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-card-bg
            ${is_online ? "bg-accent animate-pulse" : "bg-font-muted/50"}`}
        />
      </div>
      <span className="text-sm text-font-main truncate flex-1">{name}</span>
      {is_online ? (
        <Wifi size={13} className="text-accent shrink-0" />
      ) : (
        <WifiOff size={13} className="text-font-muted/50 shrink-0" />
      )}
    </div>
  );
};

interface IParticipants {
  snapshot: any;
}

export const Participants = ({ snapshot }: IParticipants) => {
  const owner = snapshot?.participants?.find(
    (p: any) => p.user_id === snapshot.room.owner_id,
  );
  const participants = snapshot?.participants || [];
  const participantsOnline = participants.filter((p: PCardI) => p.is_online);
  const participantsOffline = participants.filter((p: PCardI) => !p.is_online);

  return (
    <div className="flex-1 w-full p-5 border border-font-main/20 bg-card-bg/20 rounded-xl flex flex-col gap-4 h-full justify-center">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
          <Star size={14} className="text-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] uppercase tracking-widest text-font-muted/60">
            Владелец
          </span>
          <span className="text-sm font-medium text-font-main leading-tight">
            {owner?.name ?? "Не определён"}
          </span>
        </div>
      </div>

      <div className="h-px w-full bg-font-muted/20" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-font-muted">
          <Users size={15} />
          <span className="text-xs uppercase tracking-widest">Участники</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-font-muted/60">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {participantsOnline.length} онлайн
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-font-muted/40 inline-block" />
            {participantsOffline.length} офлайн
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {participantsOnline.map((p: PCardI) => (
          <PCard key={p.id} id={p.id} name={p.name} is_online={p.is_online} />
        ))}
        {participantsOffline.map((p: PCardI) => (
          <PCard key={p.id} id={p.id} name={p.name} is_online={p.is_online} />
        ))}
      </div>

      <div className="h-px w-full bg-font-muted/20" />

      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] uppercase tracking-widest text-font-muted/60">
          Пригласить
        </span>
        <CopyField snapshot={snapshot} />
      </div>
    </div>
  );
};
