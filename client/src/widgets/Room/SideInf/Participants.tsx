interface PCardI {
  id: string;
  name: string;
  is_online: boolean;
}

export const PCard = ({ id, name, is_online }: PCardI) => {
  return (
    <div
      className="px-5 py-3 bg-main-bg/20 border border-font-muted/20 rounded-xl flex gap-2 items-center"
      key={id}
    >
      <div
        className={`rounded-full h-2 w-2 animate-pulse ${is_online ? "bg-accent" : "bg-font-muted"}`}
      />
      <p className="text-sm text-font-main">{name}</p>
    </div>
  );
};

interface IParticipants {
  snapshot: any;
}

export const Participants = ({ snapshot }: IParticipants) => {
  const participants = snapshot?.participants || [];

  const participantsOnline = participants.filter(
    (participant: PCardI) => participant.is_online == true,
  );
  const participantsOffline = participants.filter(
    (participant: PCardI) => participant.is_online == false,
  );

  return (
    <div>
      <h1 className="text-sm text-font-muted">Участники</h1>
      <div className="grid grid-cols-2 gap-1 my-4">
        {participantsOnline.map((participant: PCardI) => (
          <PCard
            key={participant.id}
            id={participant.id}
            name={participant.name}
            is_online={participant.is_online}
          />
        ))}
        {participantsOffline.map((participant: PCardI) => (
          <PCard
            key={participant.id}
            id={participant.id}
            name={participant.name}
            is_online={participant.is_online}
          />
        ))}
      </div>
    </div>
  );
};
