import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useRoomSocket = (roomId: string) => {
  const queryClient = useQueryClient();
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!roomId) return;
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const host = "localhost:8000";
    const wsUrl = `ws://${host}/api/v1/ws/rooms/${roomId}?token=${token}`;

    const connect = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }

      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("✅ WebSocket Connected");
        if (reconnectTimerRef.current) {
          clearTimeout(reconnectTimerRef.current);
          reconnectTimerRef.current = null;
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (
            data.type === "room.snapshot" ||
            data.type === "presence.changed"
          ) {
            const newSnapshot = data.payload?.snapshot ?? data.payload;

            if (newSnapshot) {
              queryClient.setQueryData(["roomSnapshot", roomId], newSnapshot);
            }
          }
        } catch (err) {
          console.error("❌ Message parse error", err);
        }
      };

      socket.onclose = (e) => {
        console.log("🔌 Connection closed:", e.code);
        if (e.code !== 1000) {
          reconnectTimerRef.current = setTimeout(() => {
            console.log("🔄 Attempting to reconnect...");
            connect();
          }, 3000);
        }
      };

      socket.onerror = (err) => {
        console.error("⚠️ WS Error:", err);
        socket.close();
      };
    };

    connect();

    return () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close(1000);
      }
    };
  }, [roomId, queryClient]);
};
