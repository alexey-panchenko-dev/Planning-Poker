import { IRoomSnapshot } from "@/entities/room/model/types";

export const VoitingCard = ({ snapshot }: { snapshot: IRoomSnapshot }) => {
  return (
    <div className="w-20 h-30 bg-card-bg/20 border border-text-muted/20"></div>
  );
};
