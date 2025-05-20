import { create } from 'zustand';
import { useSelectedItem } from './selectedItem';

interface EditedItemState {
  // State
  done: boolean;
  title: string;
  due: string;
  dueDate: Date | undefined;
  note: string;
  notification: string;
  notificationDate: Date | undefined;
  priority: string;
  
  // Actions
  setEditedItem: (item: Partial<EditedItemState>) => void;
  setEditedDone: (done: boolean) => void;
  setEditedTitle: (title: string) => void;
  setEditedDue: (due: string) => void;
  setEditedDueDate: (dueDate: Date | undefined) => void;
  setEditedNote: (note: string) => void;
  setEditedNotification: (notification: string) => void;
  setEditedNotificationDate: (notificationDate: Date | undefined) => void;
  setEditedPriority: (priority: string) => void;
}

export const useEditedItem = create<EditedItemState>((set) => ({
  // Initial state
  done: false,
  title: '',
  due: '',
  dueDate: undefined,
  note: '',
  notification: '',
  notificationDate: undefined,
  priority: '',

  // Actions
  setEditedItem: (item) => set((state) => ({ ...state, ...item })),
  setEditedDone: (done) => set({ done }),
  setEditedTitle: (title) => set({ title }),
  setEditedDue: (due) => set({ due }),
  setEditedDueDate: (dueDate) => set({ dueDate }),
  setEditedNote: (note) => set({ note }),
  setEditedNotification: (notification) => set({ notification }),
  setEditedNotificationDate: (notificationDate) => set({ notificationDate }),
  setEditedPriority: (priority) => set({ priority }),
}));