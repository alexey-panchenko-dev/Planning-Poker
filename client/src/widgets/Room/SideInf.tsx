import { useState } from "react";
import { Button } from "@/shared";

interface IsideInf {
  snapshot: any;
}

export const SideInf = ({ snapshot }: IsideInf) => {
  const [isInviteModal, setIsinviteModal] = useState(false);

  const owner = snapshot?.participants?.find(
    (p: any) => p.user_id === snapshot.room.owner_id,
  );

  return (
    <div className="p-3 border border-font-main/20 bg-card-bg rounded-xl space-y-3">
      {/* общая инфа */}
      <h1 className="text-xl text-font-main font-medium">
        {snapshot?.room?.name}
      </h1>
      <h2 className="text-sm text-font-muted">{snapshot?.room?.description}</h2>
      <h3 className="text-accent">
        <span className="text-font-muted">Владелец комнаты : </span>
        {owner?.name || "Не определен ("}
      </h3>

      <div className="h-px w-full bg-font-muted/30" />

      {/* участники */}
      <div>
        <Button
          value="Пригласить участников"
          variant="accentLiner"
          onClick={() => setIsinviteModal((prev) => !prev)}
        />
      </div>
    </div>
  );
};
