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
  const { data: snapshot, isLoading } = roomSnapshot(id);
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

  return (
    <GuardQuery isLoading={isLoading}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="min-h-screen w-full flex justify-center bg-main-bg overflow-x-hidden">
          <div className="w-full max-w-[1440px] px-8 pt-20 pb-10 flex flex-col gap-8">
            <div className="flex items-center">
              <BackButton path="rooms" />
            </div>
            
            <div className="flex gap-8 items-start">
              <SideInf snapshot={snapshot} />
              
              <div className="flex flex-col flex-1 min-h-0 gap-8">
                <SelectedTask snapshot={snapshot!} id={id} />
                <Participants snapshot={snapshot!} />
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

