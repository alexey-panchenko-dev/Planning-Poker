import { Task } from "@/entities/task/model/types";

export interface RoomProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  invite_link: string;
  participants_count: number;
  active_task_title: string;
  last_activity_at: string;
  created_at: string;
}

export interface DeckPreset {
  id: string;
  name: string;
  code: string;
  description: string;
  cards: string[];
}

export interface RoomSnapshot {
  room: {
    id: string;
    name: string;
    description: string;
    deck: DeckPreset;
  };
  tasks: Task[];
}
