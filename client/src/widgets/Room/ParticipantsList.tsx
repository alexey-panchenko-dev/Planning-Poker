import { useRoomStore } from "@/entities/room/model/useRoomStore";

export const ParticipantsList = () => {
  const participants = useRoomStore((s) => s.participants);

  const onlineCount = participants.filter((p) => p.is_online).length;

  return (
    <div>
      <h3>В сети: {onlineCount}</h3>
      <ul>
        {participants.map((p) => (
          <li key={p.id} style={{ opacity: p.is_online ? 1 : 0.5 }}>
            {p.name} {p.is_online ? "🟢" : "⚪"}
          </li>
        ))}
      </ul>
    </div>
  );
};
