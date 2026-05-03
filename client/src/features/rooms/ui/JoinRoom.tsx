import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoinRoom } from "../model/useJoinRoom";
import { Input, Button } from "@/shared";

export const JoinRoom = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: joinRoom, isPending } = useJoinRoom();
  const navigate = useNavigate();

  const handleJoin = () => {
    setError(null);
    if (!inputValue.trim()) {
      setError("Пожалуйста, введите код или ссылку");
      return;
    }

    let token = inputValue.trim();

    // Parse token if it's a full URL
    if (token.includes("/invite/")) {
      const parts = token.split("/invite/");
      if (parts.length > 1 && parts[1]) {
        token = parts[1].split(/[/?#]/)[0]; // Extract token without extra URL params
      } else {
        setError("Неверный формат ссылки");
        return;
      }
    }

    joinRoom(token, {
      onSuccess: (data) => {
        navigate(`/rooms/${data.room.id}`);
      },
      onError: (err: any) => {
        const msg = err.response?.data?.detail || "Не удалось присоединиться к комнате. Проверьте ссылку или код.";
        setError(msg);
      },
    });
  };

  return (
    <div className="w-full max-w-md bg-card-bg/30 p-8 rounded-[32px] border border-font-muted/10 backdrop-blur-sm">
      <h2 className="text-2xl font-medium mb-6">Найти сессию</h2>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Введите код или ссылку"
              variant="default2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              error={error || undefined}
            />
          </div>
          <div className="mt-0">
             <Button 
               value={isPending ? "Подключение..." : "Присоединиться"} 
               onClick={handleJoin} 
               disabled={isPending}
               className="h-[42px]"
             />
          </div>
        </div>
      </div>
    </div>
  );
};
