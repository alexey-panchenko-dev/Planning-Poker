import { useParams } from "react-router-dom";
import { useEffect, useCallback, useMemo, useState } from "react";
import { roomSnapshot } from "@/entities/room/model/roomSnapshot";
import { GuardQuery } from "@/app/Guard/GuardQuery";
import { SideInf } from "@/widgets/Room/SideInf/SideInf";
import { SelectedTask } from "@/widgets/Room/SelectedTask/ui/SelectedTask";
import { Participants } from "@/widgets/Room/Participants";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { useRoomSocket } from "@/entities/room/model/useRoomSocket";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { BackButton } from "@/shared/ui/BackButton";
import { ITask } from "@/entities/room/model/types";
import { Button } from "@/shared";
import { HelpCircle } from "lucide-react";
import { Joyride, Step, EventData } from "react-joyride";

const DROP_ANIMATION_CONFIG = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading, error } = roomSnapshot(id);
  useRoomSocket(id ?? "");
  const initSelectedTaskId = useSelectedTaskStore(
    (state) => state.initSelectedTaskId,
  );
  const activeRoundTaskId = snapshot?.active_round?.task_id;

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    if (activeRoundTaskId) {
      initSelectedTaskId(activeRoundTaskId);
    }
  }, [activeRoundTaskId, initSelectedTaskId]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      const taskId = String(active.id);
      setActiveId(null);

      if (over && over.id === "selectZone") {
        initSelectedTaskId(taskId);
      } else {
        initSelectedTaskId(null);
      }
    },
    [initSelectedTaskId],
  );

  const activeTask = useMemo(
    () => snapshot?.tasks?.find((t: ITask) => t.id === activeId),
    [snapshot, activeId],
  );

  const [runTour, setRunTour] = useState(false);

  const steps: Step[] = [
    {
      target: "#sideInf",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Бэклог задач</h3>
          <p className="text-sm">
            Управление списком задач: создание, удаление и выбор задач для
            оценки.
          </p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#selectedTask",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Панель голосования</h3>
          <p className="text-sm">
            Область оценки текущей задачи. Здесь запускается голосование и
            фиксируется история раундов. Перетащите сюда задачу из беклога для
            взаимодействия.
          </p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#participants",
      skipBeacon: true,
      content: (
        <div className="text-left">
          <h3 className="font-bold mb-1">Управление сессией</h3>
          <p className="text-sm">
            Мониторинг статуса команды в реальном времени и копирование ссылок
            для приглашения.
          </p>
        </div>
      ),
      placement: "top",
    },
  ];

  const handleTourEvent = (data: EventData) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setRunTour(false);
    }
  };

  return (
    <GuardQuery isLoading={isLoading} error={error}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
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
        <div className="min-h-screen w-full flex justify-center bg-main-bg overflow-x-hidden">
          <div className="w-full max-w-[1440px] px-8 pt-20 pb-10 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <BackButton path="rooms" />
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

            <div className="flex gap-8 items-start">
              <div id="sideInf">
                <SideInf snapshot={snapshot} />
              </div>

              <div className="flex flex-col flex-1 min-h-0 gap-8">
                <div id="selectedTask">
                  <SelectedTask snapshot={snapshot!} id={id} />
                </div>
                <div id="participants">
                  <Participants snapshot={snapshot!} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DragOverlay dropAnimation={DROP_ANIMATION_CONFIG}>
          {activeId && activeTask ? (
            <div className="px-5 py-3 bg-accent/90 text-white rounded-2xl border border-white/20 flex items-center gap-3 cursor-grabbing shadow-2xl scale-110 backdrop-blur-md">
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
              <span className="font-bold text-sm tracking-tight truncate max-w-[240px]">
                {activeTask.title}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </GuardQuery>
  );
};
