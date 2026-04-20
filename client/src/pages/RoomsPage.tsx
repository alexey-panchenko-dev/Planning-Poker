import { useState } from "react";
import { RoomList } from "@/widgets/Rooms/RoomsList";
import { CreateRoomModal } from "@/features/rooms/ui/CreateRoomModal";

export const RoomsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6 mt-15">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Комнаты</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-[#00c38b] text-black font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,195,139,0.4)] transition-all"
        >
          + Создать комнату
        </button>
      </div>
      <RoomList />
      <CreateRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
