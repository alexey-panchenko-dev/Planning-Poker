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
    () => snapshot?.tasks?.find((t: any) => t.id === activeId),
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
        <div className="h-fit w-full flex justify-center items-center">
          <div className="h-screen pt-15 w-[1400px] flex-col gap-5">
            <BackButton path="rooms" />
            <div className="flex gap-5">
              <SideInf snapshot={snapshot} />
              <div
                className="flex flex-col flex-1 min-h-0 gap-5"
                style={{ height: "fit-content", alignSelf: "flex-start" }}
              >
                <SelectedTask snapshot={snapshot} id={id} />
                <Participants snapshot={snapshot} />
              </div>
            </div>
          </div>
        </div>
        <DragOverlay dropAnimation={DROP_ANIMATION_CONFIG}>
          {activeId && activeTask ? (
            <div className="px-4 py-2 bg-accent/40 text-font-main rounded-lg border border-font-muted/40 flex items-center gap-2 cursor-grabbing scale-105 transition-transform duration-200">
              <div className="w-2 h-2 bg-font-main rounded-full animate-pulse" />
              <span className="font-medium text-sm truncate max-w-[200px]">
                {activeTask.title}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </GuardQuery>
  );
};
