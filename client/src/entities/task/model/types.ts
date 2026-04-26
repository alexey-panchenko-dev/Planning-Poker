export interface Task {
  id: string;
  title: string;
  description: string;
  position: number;
  status: string;
  estimate_value: string | null;
}
