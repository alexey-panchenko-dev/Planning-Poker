import { useState, useEffect } from "react";
import { RoomList } from "@/widgets/Rooms/RoomsList";
import { RoomSearch } from "@/features/rooms/ui/RoomSearch";
import { LayoutGrid, HelpCircle } from "lucide-react";
import { RoomsForm } from "@/features/rooms/ui/RoomsForm";
import { Joyride, Step, STATUS } from "react-joyride";
import { Button } from "@/shared";

export const RoomsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [runTour, setRunTour] = useState(false);

  const handleTourEvent = (data: any) => {
    const { status } = data;
    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      localStorage.setItem("hasSeenRoomsTour", "true");
      setRunTour(false);
    }
  };

  const steps: Step[] = [
    {
      target: "#tour-header",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Панель комнат</h3>
          <p className="text-sm">
            Добро пожаловать! Здесь создаются и управляются сессии
            покер-планирования.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: "#roomsForms",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Создание и вход</h3>
          <p className="text-sm">
            Вкладки для быстрой генерации новой комнаты или подключения к
            существующей по ID.
          </p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-search",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Быстрый поиск</h3>
          <p className="text-sm">
            Фильтрация активных комнат по названию или описанию в реальном
            времени.
          </p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: "#roomList",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Список сессий</h3>
          <p className="text-sm">
            Доступные карточки комнат. Кликните для перехода в рабочее
            пространство оценки.
          </p>
        </div>
      ),
      placement: "top",
    },
  ];

  return (
    <div className="relative min-h-screen bg-main-bg pt-28 pb-10 px-6 md:px-16 overflow-hidden">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        onEvent={handleTourEvent}
        locale={{
          back: "Назад",
          close: "Закрыть",
          last: "Завершить",
          next: "Далее",
          skip: "Пропустить",
        }}
        options={{
          primaryColor: "#1f60ee",
          backgroundColor: "#272b2f",
          textColor: "#f1f5f6",
          zIndex: 1000,
        }}
        styles={{
          buttonPrimary: {
            borderRadius: "12px",
            padding: "10px 20px",
          },
          buttonBack: {
            marginRight: 10,
            color: "#9CA3AF",
          },
          buttonSkip: {
            color: "#9CA3AF",
          },
          tooltipContainer: {
            textAlign: "left",
            borderRadius: "20px",
          },
        }}
      />

      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-ghost opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

      <main className="relative z-10 max-w-[1440px] mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4" id="tour-header">
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
            onClick={() => setRunTour(true)}
            variant="accentLiner"
            value={
              <div className="flex gap-1 items-center">
                <HelpCircle size={18} />
                <span>Обучение</span>
              </div>
            }
          />
        </div>

        <div className="flex gap-6 items-stretch w-full max-h-[600px]">
          <div className="w-[420px] shrink-0 border border-font-muted/15 bg-main-bg/40 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex flex-col" id="roomsForms">
              <RoomsForm />
            </div>
          </div>
          <div className="flex-1 min-w-0 bg-main-bg border border-font-muted/20 rounded-2xl flex flex-col overflow-hidden">
            <div
              className="p-5 border-b border-font-main/5 shrink-0"
              id="tour-search"
            >
              <RoomSearch value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div
              className="flex-1 overflow-y-auto p-5 rooms-scroll bg-card-bg/40 min-h-[600px]"
              id="roomList"
            >
              <RoomList searchQuery={searchQuery} />
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
