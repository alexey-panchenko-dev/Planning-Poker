import { useState } from "react";
import { JoinRoom } from "./JoinRoom";
import { CreateRoom } from "./CreateRoom";
import { Button } from "@/shared";

type TabType = "join" | "create";

export const RoomsForm = () => {
  const [activeTab, setActiveTab] = useState<TabType>("join");

  return (
    <div className="w-full">
      <div className="flex rounded-xl mb-6 gap-1">
        <Button
          type="button"
          onClick={() => setActiveTab("join")}
          variant={activeTab === "join" ? "accent" : "ghost"}
          value="Войти в комнату"
          className="w-full"
        />
        <Button
          type="button"
          onClick={() => setActiveTab("create")}
          variant={activeTab === "join" ? "ghost" : "accent"}
          value="Создать сессию"
          className="w-full"
        />
      </div>

      <div className="transition-all duration-300 dynamic-form-container">
        {activeTab === "join" ? <JoinRoom /> : <CreateRoom />}
      </div>
    </div>
  );
};
