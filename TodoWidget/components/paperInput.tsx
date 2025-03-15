import { TextInput, TextInputProps } from 'react-native-paper';

const PaperInput = (props: TextInputProps) => {
    return (
        <TextInput mode="outlined" {...props} />
    );
};

export default PaperInput;