import { useState } from "react";
import { RoomList } from "@/widgets/Rooms/RoomsList";
import { CreateRoomModal } from "@/features/rooms/ui/CreateRoomModal";
import { Button } from "@/shared";

export const RoomsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen px-16 mt-25">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Комнаты</h1>
        <Button
          onClick={() => setIsOpen(true)}
          value="+ Создать комнату"
          variant="accentLiner"
        />
      </div>
      <RoomList />
      <CreateRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
