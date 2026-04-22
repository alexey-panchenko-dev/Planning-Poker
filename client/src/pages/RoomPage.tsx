import { useParams } from "react-router-dom";
import { useRoom } from "@/entities/room/api/useRoom";
import { Cards } from "@/widgets/Rooms/Cards";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading } = useRoom(id);
  const currentRoom = snapshot?.room;

  if (isLoading) return <div className="mt-20 text-font-main text-center">Загрузка...</div>;

  if (!currentRoom)
    return <div className="mt-20 text-danger text-center">Комната не найдена</div>;

  return (
    <div className="mt-20 px-16 text-font-main h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{currentRoom.name}</h1>
        {currentRoom.description && (
          <p className="text-font-muted">{currentRoom.description}</p>
        )}
      </div>
      <Cards cards={currentRoom.deck.cards} />
    </div>
  );
};
