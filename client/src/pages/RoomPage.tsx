import { useParams } from "react-router";
import { roomSnapshot } from "@/entities/room/model/roomSnapshot";
import { GuardQuery } from "@/app/Guard/GuardQuery";

import { SideInf } from "@/widgets/Room/SideInf/SideInf";
import { SelectedTask } from "@/widgets/Room/SelectedTask/ui/SelectedTask";
import { Participants } from "@/widgets/Room/Participants";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading, isError } = roomSnapshot(id);

  console.log(snapshot);
  return (
    <GuardQuery isLoading={isLoading}>
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
