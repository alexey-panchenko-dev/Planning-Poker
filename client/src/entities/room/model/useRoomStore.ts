import { create } from "zustand";

interface IRoomStore {
  participants: any[];
  activeRound: any | null;
  tasks: any[];
  history: any[];
  roomMeta: any | null;
  selfParticipantId: string | null;
  selectedTask: string | null;

  setRoomSnapshot: (snapshot: any) => void;
  setSelectedTask: (id: string | null) => void;
  setVotingMode: (mode: boolean) => void;
  isVotingMode: boolean;
}

export const useRoomStore = create<IRoomStore>((set) => ({
  participants: [],
  activeRound: null,
  tasks: [],
  history: [],
  roomMeta: null,
  selfParticipantId: null,
  selectedTask: null,
  isVotingMode: false,

  setRoomSnapshot: (snapshot) => {
    if (!snapshot) return;
    set({
      participants: snapshot.participants || [],
      activeRound: snapshot.active_round || null,
      tasks: snapshot.tasks || [],
      history: snapshot.history || [],
      roomMeta: snapshot.room || null,
      selfParticipantId: snapshot.self_participant_id || null,
      selectedTask: snapshot.room?.current_task_id || null,
    });
  },
  setSelectedTask: (id) => set({ selectedTask: id }),
  setVotingMode: (mode) => set({ isVotingMode: mode }),
}));
