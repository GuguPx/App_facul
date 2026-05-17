import { create } from 'zustand';

interface AppState {
  isLoggedIn: boolean;
  darkMode: boolean;
  votedEnquetes: number[];
  setLoggedIn: (v: boolean) => void;
  toggleDarkMode: () => void;
  addVote: (id: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: false,
  darkMode: false,
  votedEnquetes: [],
  setLoggedIn: (v) => set({ isLoggedIn: v }),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
  addVote: (id) => set((s) => ({ votedEnquetes: [...s.votedEnquetes, id] })),
}));
