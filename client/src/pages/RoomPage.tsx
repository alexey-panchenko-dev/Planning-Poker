import { useParams } from "react-router";
import { useEffect } from "react";
import { roomSnapshot } from "@/entities/room/model/roomSnapshot";

import { SideInf } from "@/widgets/Room/SideInf";

export const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: snapshot, isLoading, isError } = roomSnapshot(id);

  console.log(snapshot);
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-screen pt-15 max-w-[1200px]">
        <SideInf snapshot={snapshot} />
      </div>
    </div>
  );
};
