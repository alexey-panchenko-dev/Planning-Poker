import { create } from "zustand";

interface StoreI {
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;

  isRoundStart: boolean;
}

export const useSelectedTaskStore = create<StoreI>((set) => ({
  selectedTaskId: null,

  setSelectedTaskId: (id) => {
    set((state) => ({
      selectedTaskId: id === state.selectedTaskId ? null : id,
    }));
  },

  isRoundStart: false,
}));
