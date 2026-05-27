import { Tasks } from "./Tasks";
import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { IRoomSnapshot } from "@/entities/room/model/types";

interface IsideInf {
  snapshot: IRoomSnapshot | undefined;
}

export const SideInf = ({ snapshot }: IsideInf) => {
  const user = useSessionStore((state) => state.user);
  const owner = snapshot?.participants?.find(
    (p) => p.user_id === snapshot.room.owner_id,
  );
  const isOwner = user?.id == owner?.user_id;

  return (
    <div
      id="side-inf-container"
      className="relative p-6 border border-font-main/15 bg-card-bg/20 backdrop-blur-sm rounded-2xl w-[450px] h-[600px] flex flex-col gap-5 shadow-xl shadow-black/5 overflow-hidden"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-font-main leading-tight tracking-tight">
          {snapshot?.room?.name}
        </h1>
        {snapshot?.room?.description && (
          <p className="text-[15px] font-medium text-font-muted/60 leading-relaxed">
            {snapshot?.room?.description}
          </p>
        )}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-font-muted/20 via-font-muted/10 to-transparent" />

      <Tasks isOwner={isOwner} snapshot={snapshot} />
    </div>
  );
};
