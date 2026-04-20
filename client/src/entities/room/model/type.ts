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
