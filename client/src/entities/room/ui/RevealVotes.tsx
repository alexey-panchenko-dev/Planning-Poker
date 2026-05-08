import { RoomSnapshot } from "../model/types";

interface RevealModalProps {
  snapshot: RoomSnapshot | undefined;
}

export const RevealVotes = ({ snapshot }: RevealModalProps) => {
  if (!snapshot) return null;

  return (
    <div className="card-bg border border-font-main/20 rounded-xl p-8 max-w-md w-full ">
      <h2 className="text-2xl font-black text-font-main mb-6 uppercase">
        Результаты раунда
      </h2>

      <div className="flex gap-3">
        {snapshot.participants.map((participant) => {
          const voteEntry = snapshot.active_round?.votes.find(
            (v) => v.participant_id === participant.id,
          );

          return (
            <div
              key={participant.id}
              className="flex flex-col items-center w-30 p-3 rounded-xl bg-font-main/5 border border-font-main/5"
            >
              <span className="text-font-main font-medium">
                {participant.name}
              </span>
              <span className="text-accent font-black text-xl">
                {voteEntry?.value || "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
