import { useParams } from "react-router-dom";
import { useEffect, useCallback, useMemo } from "react";
import { roomSnapshot } from "@/entities/room/model/roomSnapshot";
import { GuardQuery } from "@/app/Guard/GuardQuery";
import { SideInf } from "@/widgets/Room/SideInf/SideInf";
import { SelectedTask } from "@/widgets/Room/SelectedTask/ui/SelectedTask";
import { Participants } from "@/widgets/Room/Participants";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { useRoomSocket } from "@/entities/room/model/useRoomSocket";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { BackButton } from "@/shared/ui/BackButton";

const DROP_ANIMATION_CONFIG = {
  duration: 200,
  easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
};

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading } = roomSnapshot(id);
  useRoomSocket(id ?? "");
  const initSelectedTaskId = useSelectedTaskStore(
    (state) => state.initSelectedTaskId,
  );
  const selectedTask = useSelectedTaskStore((state) => state.selectedTask);
  const activeRoundTaskId = snapshot?.active_round?.task_id;

  useEffect(() => {
    if (activeRoundTaskId) {
      initSelectedTaskId(activeRoundTaskId);
    }
  }, [activeRoundTaskId, initSelectedTaskId]);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { active, over } = e;
      const taskId = String(active.id);
      if (over && over.id === "selectZone") {
        initSelectedTaskId(taskId);
      } else {
        if (selectedTask === taskId) {
          initSelectedTaskId(null);
        }
      }
    },
    [initSelectedTaskId, selectedTask],
  );

  return (
    <GuardQuery isLoading={isLoading}>
      <DndContext onDragEnd={handleDragEnd}>
        <BackButton path="rooms" />
        <div className="h-full w-full flex justify-center items-center">
          <div className="h-screen pt-15 w-[1400px] flex gap-5">
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
        <DragOverlay dropAnimation={DROP_ANIMATION_CONFIG} />
      </DndContext>
    </GuardQuery>
  );
};
