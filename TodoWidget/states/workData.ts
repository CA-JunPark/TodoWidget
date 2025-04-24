import { create } from 'zustand';
import { ItemProps } from '../components/Item';
import * as todosql from '../sqlite/todosql';

interface WorkDataState {
  workData: ItemProps[];
  setWorkData: (data: ItemProps[]) => void;
  reorderItem: (fromIndex: number, toIndex: number) => void;
  addItem: (item: ItemProps) => void;
  deleteItem: (id: number | undefined) => void;
}

// useWorkData is a state for all todo items that are not done
// it has the following properties:
// - workData: an array of todo items
// - setWorkData: a function to set the workData array
// - reorderItem: a function to reorder an item in the array
// - addItem: a function to add a new item to the array
// - deleteItem: a function to delete an item from the array
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
  deleteItem: (id: number | undefined) => {
    if (id !== undefined) {
      set((state) => {
        const newWorkData = state.workData.filter(item => item.id !== id);
        return { workData: newWorkData };
      });
    }
  },
}));

//TODO Edit order_index when Done or UnDone