import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useRoomSocket = (roomId: string) => {
  const queryClient = useQueryClient();
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isManualCloseRef = useRef(false);
  const reconnectDelayRef = useRef(1000);

  useEffect(() => {
    if (!roomId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const wsUrl = `ws://localhost:8000/api/v1/ws/rooms/${roomId}?token=${token}`;

    const connect = () => {
      if (
        socketRef.current &&
        (socketRef.current.readyState === WebSocket.OPEN ||
          socketRef.current.readyState === WebSocket.CONNECTING)
      ) {
        return;
      }

      console.log(`[WS] Connecting to room ${roomId}...`);
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log(`[WS] Connected to room ${roomId}`);
        reconnectDelayRef.current = 1000;

        if (pingTimerRef.current) clearInterval(pingTimerRef.current);
        pingTimerRef.current = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "ping" }));
          }
        }, 30000);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type !== "pong") {
            console.log(`[WS] Event received: ${data.type}`, data);
          }

          const updateTypes = [
            "room.snapshot",
            "presence.changed",
            "round.started",
            "round.revealed",
            "round.closed",
            "round.reset",
            "round.finalized",
            "vote.cast",
            "task.created",
            "task.updated",
            "task.deleted",
          ];

          if (updateTypes.includes(data.type)) {
            queryClient.invalidateQueries({
              queryKey: ["roomSnapshot", roomId],
            });
          }

          if (data.type === "error") {
            console.error(
              `[WS] Server reported error:`,
              data.payload || data.message || data,
            );
          }
        } catch (err) {}
      };

      socket.onclose = (e) => {
        console.log(`[WS] Connection closed: ${e.code} ${e.reason}`);

        if (pingTimerRef.current) {
          clearInterval(pingTimerRef.current);
          pingTimerRef.current = null;
        }

        if (!isManualCloseRef.current) {
          const delay = reconnectDelayRef.current;
          console.log(`[WS] Reconnecting in ${delay}ms...`);

          reconnectTimerRef.current = setTimeout(() => {
            connect();
            reconnectDelayRef.current = Math.min(
              reconnectDelayRef.current * 2,
              30000,
            );
          }, delay);
        }
      };

      socket.onerror = (err) => {
        console.error("[WS] Connection error:", err);
        socket.close();
      };
    };

    isManualCloseRef.current = false;
    connect();

    return () => {
      console.log(`[WS] Cleaning up socket for room ${roomId}`);
      isManualCloseRef.current = true;

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }

      if (pingTimerRef.current) {
        clearInterval(pingTimerRef.current);
        pingTimerRef.current = null;
      }

      if (socketRef.current) {
        socketRef.current.close(1000);
        socketRef.current = null;
      }
    };
  }, [roomId, queryClient]);
};
