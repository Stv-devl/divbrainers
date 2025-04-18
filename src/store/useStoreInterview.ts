import { create } from 'zustand';

interface useInterviewStateProps {
  stack: string[];
  addToStack: (tech: string) => void;
  removeFromStack: (tech: string) => void;
}

const useInterviewStore = create<useInterviewStateProps>((set) => ({
  stack: [],
  addToStack: (tech) =>
    set((state) => ({
      stack: state.stack.includes(tech) ? state.stack : [...state.stack, tech],
    })),
  removeFromStack: (tech) =>
    set((state) => ({
      stack: state.stack.filter((item) => item !== tech),
    })),
}));

export default useInterviewStore;
