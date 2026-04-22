import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { User, Mail, Calendar } from "lucide-react";

export const ProfileHeader = () => {
  const user = useSessionStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-[40px] bg-card-bg/20 border border-white/[0.05] backdrop-blur-md">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-accent/20 border-2 border-accent/30 flex items-center justify-center overflow-hidden">
          <User size={64} className="text-accent" />
        </div>
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-main-bg rounded-full" />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl font-bold text-font-main tracking-tight mb-2">
          {user.name}
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <div className="flex items-center gap-2 text-font-muted">
            <Mail size={18} className="text-accent/60" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-font-muted">
            <Calendar size={18} className="text-accent/60" />
            <span>Участник системы</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
         {/* Здесь можно добавить кнопки редактирования в будущем */}
      </div>
    </div>
  );
};
