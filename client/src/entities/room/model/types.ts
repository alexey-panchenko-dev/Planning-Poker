export interface IRoomSnapshot {
  room: IRoom;
  self_participant_id: string;
  participants: IParticipant[];
  tasks: ITask[];
  active_round: IActiveRound | null;
  history: IHistoryItem[];
}

export interface IRoom {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  owner_id: string;
  current_task_id: string | null;
  invite_link: string;
  created_at: string;
  updated_at: string;
  deck: IDeck;

  active_task_title?: string | null;
  participants_count?: number;
}

export interface IDeck {
  id: string;
  name: string;
  code: string;
  description: string;
  cards: string[];
}

export interface IParticipant {
  id: string;
  user_id: string;
  name: string;
  email: string;
  avatar_color: string;
  role: "owner" | "member" | "observer";
  seat_index: number;
  joined_at: string;
  last_seen_at: string;
  is_online: boolean;
  has_voted: boolean;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  position: number;
  status: "backlog" | "in_progress" | "estimated";
  estimate_value: string | null;
  estimated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IActiveRound {
  id: string;
  task_id: string;
  round_index: number;
  status: "voting" | "revealed" | "closed";
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
  votes: IVote[];
}

export interface IVote {
  participant_id: string;
  user_id: string;
  value: string;
  has_voted: boolean;
}

export interface IHistoryItem {
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
