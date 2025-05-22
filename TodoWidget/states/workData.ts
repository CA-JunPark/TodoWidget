import { create } from 'zustand';
import { ItemProps } from '../components/Item';
import * as todosql from '../sqlite/todosql';
import { reorderItems } from 'react-native-reorderable-list';

interface WorkDataState {
  workData: ItemProps[];
  doneData: ItemProps[];
  setWorkData: (data: ItemProps[]) => void;
  setDoneData: (data: ItemProps[]) => void;
  reorderWorkItem: (fromIndex: number, toIndex: number) => void;
  reorderDoneItem: (fromIndex: number, toIndex: number) => void;
  addItem: (item: ItemProps) => void;
  deleteItem: (id: number | undefined) => void;
  checkItem: (id: number | undefined) => void;
}

// useWorkData is a state for all todo items that are not done
// it has the following properties:
// - workData: an array of todo items
// - setWorkData: a function to set the workData array
// - reorderItem: a function to reorder an item in the array
// - addItem: a function to add a new item to the array
// - deleteItem: a function to delete an item from the array
// - checkItem: a function to check an item in the array
export const useWorkData = create<WorkDataState>((set) => ({
  workData: [],
  doneData: [],
  setWorkData: (data) => set({ workData: data }),
  setDoneData: (data) => set({ doneData: data }),
  reorderWorkItem: (fromIndex: number, toIndex: number) =>
    set((state) => ({
      workData: reorderItems(state.workData, fromIndex, toIndex),
    })),
  reorderDoneItem: (fromIndex: number, toIndex: number) =>
    set((state) => ({
      doneData: reorderItems(state.doneData, fromIndex, toIndex),
    })),
  addItem: (item) => set((state) => ({
    workData: [item, ...state.workData],
  })),
  deleteItem: (id: number | undefined) => {
    if (id !== undefined) {
      set((state) => {
        const newWorkData = state.workData.filter(item => item.id !== id);
        const newDoneData = state.doneData.filter(item => item.id !== id);
        return { workData: newWorkData, doneData: newDoneData };
      });
    }
  },
  checkItem: (id: number | undefined) => {
    if (id !== undefined) {
      set((state) => {
        const newWorkData = state.workData
          .map(item =>item.id === id ? { ...item, done: item.done === 1 ? 0 : 1 } : item)
          .filter(item => item.done === 0);
        const newDoneData = state.doneData
          .map(item =>item.id === id ? { ...item, done: item.done === 1 ? 0 : 1 } : item)
          .filter(item => item.done === 1);
        return { workData: newWorkData, doneData: newDoneData };
      });
    }
  },
}));