import { useState } from "react";
import { RoomList } from "@/widgets/Rooms/RoomsList";
import { CreateRoomModal } from "@/features/rooms/ui/CreateRoomModal";
import { RoomSearch } from "@/features/rooms/ui/RoomSearch";
import { LayoutGrid } from "lucide-react";

export const RoomsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative min-h-screen bg-main-bg pt-28 pb-10 px-6 md:px-16 overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-ghost opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

      <main className="relative z-10 max-w-[1440px] mx-auto flex flex-col gap-8">
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

        <div className="flex gap-6 items-center border border-font-muted/20 bg-main-bg rounded-2xl">
          <div
            className="flex-1 min-w-0 bg-main-bg border border-font-main/5 rounded-2xl flex flex-col"
            style={{ height: "calc(100vh - 220px)" }}
          >
            <div className="p-5 border-b border-font-main/5 shrink-0">
              <RoomSearch value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex-1 overflow-y-auto p-5 rooms-scroll bg-card-bg/40">
              <RoomList searchQuery={searchQuery} />
            </div>
          </div>

          <div className="w-[420px] shrink-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-font-muted uppercase tracking-widest">
              Новая комната
            </span>
            <div className="p-5">
              <CreateRoomModal />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .rooms-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .rooms-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .rooms-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .rooms-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
        }
        .rooms-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
};
