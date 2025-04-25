import { useWorkData } from "@/states/workData";
import { Checkbox } from "react-native-paper";
import { MD3DarkTheme } from "react-native-paper";
import { useTodoDB } from '../states/todoDB';
import * as todosql from '../sqlite/todosql';
import * as SQLite from 'expo-sqlite';

interface CustomCheckboxProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
    id: number | undefined;
}

export const CustomCheckbox = ({ checked, setChecked, id }: CustomCheckboxProps) => {
    const { db } = useTodoDB();
    const { setWorkData, setDoneData, checkItem } = useWorkData();

    const loadData = async (db: SQLite.SQLiteDatabase | null) => {
        const data = await todosql.getAllTodos(db);
        setWorkData(data?.filter(item => item.done === 0) ?? []);
        setDoneData(data?.filter(item => item.done === 1) ?? []);
    };

    const handleCheck = () => {
        if (id == undefined) return;
        setChecked(!checked);
        checkItem(id);
        todosql.updateCheckById(db, id, !checked ? 1 : 0).then(() => {
            loadData(db);
        });
    };
    
    return (
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => handleCheck()}
            color={MD3DarkTheme.colors.background}
            uncheckedColor={MD3DarkTheme.colors.background}
        />
    );
};
