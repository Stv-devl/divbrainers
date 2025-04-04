import { UserProfile } from '@/types/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserProfile) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      setUser: (user: UserProfile) => set({ user }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
