import { useEffect, useRef } from "react";
import { useRoomStore } from "../model/useRoomStore";
import { useQueryClient } from "@tanstack/react-query";

export const useRoomSocket = (roomId: string) => {
  const queryClient = useQueryClient();

  const setRoomSnapshot = useRoomStore((s) => s.setRoomSnapshot);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const host = "localhost:8000";
    const wsUrl = `ws://${host}/api/v1/ws/rooms/${roomId}?token=${token}`;

    const connect = () => {
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket Connected");
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (
            data.type === "room.snapshot" ||
            data.type === "presence.changed"
          ) {
            const newSnapshot = data.payload.snapshot || data.payload;
            queryClient.setQueryData(["room", roomId], newSnapshot);
          }
        } catch (err) {
          console.error("Message parse error", err);
        }
      };

      socket.onclose = (e) => {
        console.log("🔌 Connection closed:", e.code);
        if (e.code === 1006) {
          setTimeout(connect, 3000);
        }
      };

      socket.onerror = (err) => {
        console.error("⚠️ WS Error:", err);
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId, setRoomSnapshot]);
};
