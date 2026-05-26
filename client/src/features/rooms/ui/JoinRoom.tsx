import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJoinRoom } from "../model/useJoinRoom";
import { Input, Button } from "@/shared";
import { useQueryClient } from "@tanstack/react-query";

export const JoinRoom = () => {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: joinRoom, isPending } = useJoinRoom();
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!inputValue.trim()) {
      setError("Пожалуйста, введите код или ссылку");
      return;
    }

    let token = inputValue.trim();

    if (token.includes("/invite/")) {
      const parts = token.split("/invite/");
      if (parts.length > 1 && parts[1]) {
        token = parts[1].split(/[/?#]/)[0];
      } else {
        setError("Неверный формат ссылки");
        return;
      }
    }

    joinRoom(token, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["roomSnapshot"] });
        navigate(`/rooms/${data.room.id}`);
      },
      onError: (err: any) => {
        const msg =
          err.response?.data?.detail || "Не удалось подключиться к комнате.";
        setError(msg);
      },
    });
  };

  return (
    <form onSubmit={handleJoin} className="w-full flex flex-col gap-3">
      <div className="w-full">
        <Input
          placeholder="Введите код или ссылку"
          variant="default2"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError(null);
          }}
          error={error || undefined}
        />
      </div>

      <Button
        type="submit"
        value={isPending ? "Подключение..." : "Присоединиться"}
        disabled={isPending}
        className="w-full rounded-xl py-3"
      />
    </form>
  );
};
