import { useState } from "react";
import { RoomList } from "@/widgets/Rooms/RoomsList";
import { CreateRoomModal } from "@/features/rooms/ui/CreateRoomModal";
import { RoomSearch } from "@/features/rooms/ui/RoomSearch";
import { Button } from "@/shared";
import { Plus, LayoutGrid } from "lucide-react";

export const RoomsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen bg-main-bg pt-28 pb-10 px-6 md:px-16 overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-ghost opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

      <main className="relative z-10 max-w-[1440px] mx-auto flex flex-col gap-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-2xl border border-accent/20">
              <LayoutGrid size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-font-main tracking-tight">
                Доступные комнаты
              </h1>
              <p className="text-font-muted text-sm mt-1">
                Выберите активную сессию или создайте новое пространство
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            value={"+ Создать комнату"}
            variant="accentLiner"
            className="w-full sm:w-auto"
          />
        </div>

        <RoomSearch value={searchQuery} onChange={setSearchQuery} />

        <RoomList searchQuery={searchQuery} />
      </main>

      <CreateRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
