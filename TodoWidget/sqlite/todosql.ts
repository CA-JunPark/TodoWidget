import * as SQLite from 'expo-sqlite';
import { ItemProps } from '../components/Item';
// TODO: use WidgetModule to update widget 
// import { NativeModules } from 'react-native';
// const { WidgetModule } = NativeModules;

export const createTableIfNotExists = async (db: SQLite.SQLiteDatabase) => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT DEFAULT NULL,
        due TEXT DEFAULT "",
        done INTEGER DEFAULT 0,
        priority TEXT DEFAULT "",
        note TEXT DEFAULT "",
        notification TEXT DEFAULT "",
        order_index INTEGER DEFAULT 0,
        when_created TEXT DEFAULT ""
    );`);
};

export const addTodo = async (db: SQLite.SQLiteDatabase, item: ItemProps) => {
    // Insert a new todo into the database.
    // The datetime('now') function is used to set the current date and time in the when_created column.
    await db.runAsync('INSERT INTO todo (title, note, priority, notification, due, when_created, order_index) VALUES (?, ?, ?, ?, ?, datetime(\'now\'), 0);',
        [item.title ?? '', item.note ?? '', item.priority ?? '', item.notification ?? '', item.due ?? '']);
};

export const deleteTodo = async (db: SQLite.SQLiteDatabase, id: string) => {
    // Delete a todo from the database.
    // Identified by ID
    await db.runAsync('DELETE FROM todo WHERE id = ?;', [id]);
};

export const updateTodo = async (db: SQLite.SQLiteDatabase, item: ItemProps) => {
    // Update an existing todo in the database.
    // Identified by ID
    await db.runAsync('UPDATE todo SET title = ?, note = ?, priority = ?, notification = ?, due = ?, order_index = ? WHERE id = ?;',
        [item.title ?? '', item.note ?? '', item.priority ?? '', item.notification ?? '', item.due ?? '', item.order_index ?? 0, item.id]
    );
};

export const getAllTodos = async (db: SQLite.SQLiteDatabase) => {
    // Get all todos from the database.
    const result = await db.getAllAsync("SELECT * FROM todo");
    return result;
};

export const getTodoById = async (db: SQLite.SQLiteDatabase, id: string) => {
    // Get a todo by ID from the database.
    const result = await db.runAsync("SELECT * FROM todo WHERE id = ?", [id]);
    return result;
};
