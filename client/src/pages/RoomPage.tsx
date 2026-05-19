import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { roomSnapshot } from "@/entities/room/model/roomSnapshot";
import { GuardQuery } from "@/app/Guard/GuardQuery";

import { SideInf } from "@/widgets/Room/SideInf/SideInf";
import { SelectedTask } from "@/widgets/Room/SelectedTask/ui/SelectedTask";
import { Participants } from "@/widgets/Room/Participants";
import { useSelectedTaskStore } from "@/widgets/Room/SelectedTask/model/useSelectedTaskStore";
import { useRoomSocket } from "@/entities/room/model/useRoomSocket";

import { BackButton } from "@/shared/ui/BackButton";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading } = roomSnapshot(id);
  useRoomSocket(id ?? "");

  const initSelectedTaskId = useSelectedTaskStore(
    (state) => state.initSelectedTaskId,
  );
  const activeRoundTaskId = snapshot?.active_round?.task_id;

  useEffect(() => {
    if (activeRoundTaskId) {
      initSelectedTaskId(activeRoundTaskId);
    }
  }, [activeRoundTaskId, initSelectedTaskId]);

  return (
    <GuardQuery isLoading={isLoading}>
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
    </GuardQuery>
  );
};
