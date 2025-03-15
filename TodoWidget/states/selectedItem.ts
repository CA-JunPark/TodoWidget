import { create } from 'zustand';
import { ItemProps } from '../components/Item';

interface SelectedItemState {
  selectedItem: ItemProps | null;
  setSelectedItem: (item: ItemProps | null) => void;
}

export const useSelectedItem = create<SelectedItemState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
