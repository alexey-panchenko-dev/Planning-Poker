import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJoinRoom } from "@/features/rooms/model/useJoinRoom";

export const InvitePage = () => {
  const { token } = useParams<{ token: string }>();
  const { mutate: joinRoom, error } = useJoinRoom();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      joinRoom(token, {
        onSuccess: (data) => {
          navigate(`/rooms/${data.room.id}`);
        },
      });
    }
  }, [token, joinRoom, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-bg text-font-main px-6">
      <div className="max-w-md w-full bg-card-bg border border-font-muted/10 p-10 rounded-[32px] text-center shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Присоединение к комнате...</h1>
        {error ? (
          <div>
             <p className="text-danger mb-6">
              {(error as any)?.response?.data?.detail || "Не удалось присоединиться. Возможно ссылка недействительна или устарела."}
             </p>
             <button onClick={() => navigate('/')} className="bg-accent/10 text-accent px-6 py-2 rounded-xl hover:bg-accent/20 transition-colors">
               На главную
             </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
             <p className="text-font-muted">Пожалуйста, подождите...</p>
          </div>
        )}
      </div>
    </div>
  );
};
