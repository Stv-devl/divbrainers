import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useInterviewStateProps {
  stack: string[];
  addToStack: (tech: string) => void;
  removeFromStack: (tech: string) => void;
}

const useInterviewStore = create<useInterviewStateProps>()(
  persist(
    (set) => ({
      stack: [],
      addToStack: (tech: string) =>
        set((state) => ({
          stack: state.stack.includes(tech)
            ? state.stack
            : [...state.stack, tech],
        })),
      removeFromStack: (tech: string) =>
        set((state) => ({
          stack: state.stack.filter((item: string) => item !== tech),
        })),
    }),
    {
      name: 'interview-storage',
      partialize: (state) => ({ stack: state.stack }),
    }
  )
);

export default useInterviewStore;
