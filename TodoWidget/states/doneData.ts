import { create } from 'zustand';
import { ItemProps } from '../components/Item';

interface DoneDataState {
  doneData: ItemProps[];
  setDoneData: (data: ItemProps[]) => void;
}

export const useDoneData = create<DoneDataState>((set) => ({
  doneData: [],
  setDoneData: (data) => set({ doneData: data }),
}));