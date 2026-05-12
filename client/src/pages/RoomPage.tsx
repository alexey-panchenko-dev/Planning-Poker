import { useParams } from "react-router";
import { roomSnapshot } from "@/entities/room/model/roomSnapshot";

export const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: snapshot, isLoading, isError } = roomSnapshot(roomId);

  return <div>RoomPage</div>;
};
