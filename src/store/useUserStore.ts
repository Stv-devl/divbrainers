import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@/types/type';

interface UserState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserProfile) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
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
