import { TextInput, TextInputProps } from 'react-native-paper';

export const PaperInput = (props: TextInputProps) => {
    return (
        <TextInput mode="outlined" {...props} />
    );
};
