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

export interface Participant {
  id: string;
  user_id: string;
  name: string;
  email: string;
  avatar_color: string;
  role: string;
  seat_index: number;
  joined_at: string;
  last_seen_at: string;
  is_online: boolean;
  has_voted: boolean;
}

export interface ActiveRound {
  id: string;
  task_id: string;
  round_index: number;
  status: string;
  started_at: string;
  revealed_at: string | null;
  closed_at: string | null;
  votes_submitted: number;
  total_participants: number;
  can_reveal: boolean;
  suggested_result: string | null;
  average_score: number;
  consensus: boolean;
  distribution: Record<string, number>;
  self_vote_value: string | null;
  votes: Array<{
    participant_id: string;
    user_id: string;
    value: string;
    has_voted: boolean;
  }>;
}

export interface RoomHistoryItem {
  id: string;
  round_id: string;
  task_id: string;
  task_title: string;
  result_value: string;
  average_score: number;
  consensus: boolean;
  votes_count: number;
  distribution: Record<string, number>;
  created_at: string;
}

export interface RoomSnapshot {
  room: {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: string;
    owner_id: string;
    current_task_id: string | null;
    invite_link?: string;
    created_at: string;
    updated_at: string;
    deck: DeckPreset;
  };
  self_participant_id: string;
  participants: Participant[];
  tasks: Task[];
  active_round: ActiveRound | null;
  history: RoomHistoryItem[];
}
