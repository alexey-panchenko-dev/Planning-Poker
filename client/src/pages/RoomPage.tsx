import { useParams } from "react-router-dom";
import { useRooms } from "@/entities/room/api/useRooms";
import { Cards } from "@/widgets/Rooms/Cards";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: rooms, isLoading } = useRooms();
  const currentRoom = rooms?.find((room) => String(room.id) === String(id));

  if (isLoading) return <div className="mt-20 text-font-main">Загрузка...</div>;

  if (!currentRoom)
    return <div className="mt-20 text-danger">Комната не найдена</div>;

  return (
    <div className="mt-20 px-16 text-font-main h-screen">
      <div>
        <h1 className="text-2xl font-bold">{currentRoom.name}</h1>
        <p className="text-font-muted">{currentRoom.description}</p>
      </div>
      <Cards />
    </div>
  );
};
