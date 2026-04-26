import { create } from "zustand";

interface VotingStore {
  isVote: boolean;
  selectedTask: string | number | null;
  setVoteStatus: (status: boolean) => void;
  selectCard: (value: string | number | null) => void;
}

export const useVotingStore = create<VotingStore>((set) => ({
  isVote: true,
  selectedTask: null,

  setVoteStatus: (status) => set({ isVote: status }),
  selectCard: (value) =>
    set((state) => ({
      selectedTask: state.selectedTask === value ? null : value,
    })),
}));
