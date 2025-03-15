import { Checkbox } from "react-native-paper";
import { MD3DarkTheme } from "react-native-paper";

interface CustomCheckboxProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

export const CustomCheckbox = ({ checked, setChecked }: CustomCheckboxProps) => {
    return (
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color={MD3DarkTheme.colors.background}
            uncheckedColor={MD3DarkTheme.colors.background}
        />
    );
};
