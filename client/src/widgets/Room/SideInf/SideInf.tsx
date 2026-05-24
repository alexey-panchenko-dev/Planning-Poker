import { Tasks } from "./Tasks";
import { useSessionStore } from "@/entities/session/model/useSessionStore";

interface IsideInf {
  snapshot: any;
}

export const SideInf = ({ snapshot }: IsideInf) => {
  const user = useSessionStore((state) => state.user);
  const owner = snapshot?.participants?.find(
    (p: any) => p.user_id === snapshot.room.owner_id,
  );
  const isOwner = user?.id == owner?.user_id;

  return (
    <div className="p-5 border border-font-main/20 bg-card-bg/20 rounded-xl w-[450px] h-fit flex flex-col gap-4 h-[500px]">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-medium text-font-main leading-tight">
          {snapshot?.room?.name}
        </h1>
        {snapshot?.room?.description && (
          <p className="text-base text-font-muted/70 leading-relaxed">
            {snapshot?.room?.description}
          </p>
        )}
      </div>

      <div className="h-px w-full bg-font-muted/20" />

      <Tasks isOwner={isOwner} snapshot={snapshot} />
    </div>
  );
};
