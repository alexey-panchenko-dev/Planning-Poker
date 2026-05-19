import { create } from "zustand";

interface StoreI {
  selectedTask: string | null;
  setSelectedTaskId: (id: string | null) => void;

  isRoundStart: boolean;
}

export const useSelectedTaskStore = create<StoreI>((set) => ({
  selectedTask: null,

  setSelectedTaskId: (id) => {
    set((state) => ({
      selectedTask: id === state.selectedTask ? null : id,
    }));
  },

  isRoundStart: false,
}));
