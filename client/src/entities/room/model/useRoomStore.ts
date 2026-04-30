import { create } from "zustand";

interface IRoomStore {
  selectedTask: string | null;
  isVotingMode: boolean;
  setSelectedTask: (taskId: string | null) => void;
  setVotingMode: (mode: boolean) => void;
}

export const useRoomStore = create<IRoomStore>((set, get) => ({
  selectedTask: null,
  isVotingMode: false,

  setSelectedTask: (taskId) => {
    const currentSelected = get().selectedTask;
    const isSame = currentSelected === taskId;
    set({
      selectedTask: isSame ? null : taskId,
      isVotingMode: false,
    });
  },

  setVotingMode: (mode) => set({ isVotingMode: mode }),
}));
