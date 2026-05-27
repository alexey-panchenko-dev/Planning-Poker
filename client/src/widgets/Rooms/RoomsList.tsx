import { useRooms } from "@/entities/room/model/useRooms";
import { RoomCard } from "@/entities/room/ui/RoomCard";
import { type IRoom } from "@/entities/room/model/types";

export const RoomList = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const { data: rooms, isLoading, isError } = useRooms();

  const filteredRooms = rooms?.filter((room: IRoom) => {
    const query = searchQuery.toLowerCase();
    return (
      room.name.toLowerCase().includes(query) ||
      (room.description && room.description.toLowerCase().includes(query))
    );
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-white/5 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 border border-red-500/20 rounded-2xl text-red-400">
        Ошибка загрузки комнат. Проверьте соединение с сервером.
      </div>
    );
  }

  if (!filteredRooms?.length) {
    return (
      <div className="text-center p-20 text-font-muted border border-dashed border-white/5 rounded-[32px] bg-white/[0.01]">
        {searchQuery
          ? `По запросу "${searchQuery}" ничего не найдено`
          : "Список пуст."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      {filteredRooms.map((room: IRoom) => (
        <RoomCard key={room.id} {...room} />
      ))}
    </div>
  );
};
