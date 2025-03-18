import { create } from 'zustand';
import * as SQLite from 'expo-sqlite';

interface TodoDBState {
  db: SQLite.SQLiteDatabase | null;
  setDb: (db: SQLite.SQLiteDatabase | null) => void;
}

export const useTodoDB = create<TodoDBState>((set) => ({
  db: null,
  setDb: (db) => set({ db }),
}));
