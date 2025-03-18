import { create } from 'zustand';
import { ItemProps } from '../components/Item';

interface WorkDataState {
  workData: ItemProps[];
  setWorkData: (data: ItemProps[]) => void;
  reorderItem: (fromIndex: number, toIndex: number) => void;
  addItem: (item: ItemProps) => void;
}

export const useWorkData = create<WorkDataState>((set) => ({
  workData: [],
  setWorkData: (data) => set({ workData: data }),
  reorderItem: (fromIndex, toIndex) =>
    set((state) => {
      const updatedWorkData = [...state.workData];
      const [movedItem] = updatedWorkData.splice(fromIndex, 1);
      updatedWorkData.splice(toIndex, 0, movedItem);
      return { workData: updatedWorkData };
    }),
  addItem: (item) => set((state) => ({
    workData: [item, ...state.workData],
  })),
}));
