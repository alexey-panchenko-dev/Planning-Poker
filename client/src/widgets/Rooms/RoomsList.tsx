import { useRooms } from "@/entities/room/api/useRooms";
import { RoomCard } from "@/entities/room/ui/RoomCard";
import { type RoomProps } from "@/entities/room/model/type";

export const RoomList = () => {
  const { data: rooms, isLoading, isError } = useRooms();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-white/5 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 border border-red-500/20 rounded-2xl text-red-400 ">
        Ошибка загрузки комнат. Проверьте соединение с сервером.
      </div>
    );
  }

  if (!rooms?.length) {
    return (
      <div className="text-center p-10 text-gray-500 border border-dashed border-white/10 rounded-2xl ">
        Список пуст. Станьте первым, кто создаст комнату!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room: RoomProps) => (
        <RoomCard key={room.id} {...room} />
      ))}
    </div>
  );
};
