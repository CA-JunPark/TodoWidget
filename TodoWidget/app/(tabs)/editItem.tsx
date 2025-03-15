import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { MD3DarkTheme, Text } from 'react-native-paper';
import PaperInput from '../../components/paperInput';
import { useSelectedItem } from '../../states/selectedItem';
import { CustomCheckbox } from '../../components/customCheckbox';
import { PriorityButton } from '../../components/Priority';

//TODO onFocus open Calendar when set due date and 
//TODO notification modal Icon button

export default function EditItem() {
  const { selectedItem } = useSelectedItem();
  const [title, setTitle] = useState(selectedItem?.title || '');
  const [due, setDue] = useState(selectedItem?.due || '');
  const [note, setNote] = useState(selectedItem?.note || '');
  const [notification, setNotification] = useState(selectedItem?.notification || '');
  const [checked, setChecked] = useState(selectedItem?.done === 1);
  const [priority, setPriority] = useState(selectedItem?.priority || '');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title || '');
      setDue(selectedItem.due || '');
      setNote(selectedItem.note || '');
      setNotification(selectedItem.notification || '');
      setPriority(selectedItem.priority || '');
    }
  }, [selectedItem]);

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <View style={styles.checkboxContainer}>
                <CustomCheckbox checked={checked} setChecked={setChecked} />
            </View>
            <PaperInput label="Title" value={title} onChangeText={setTitle} style={styles.titleInput} left />
            <PriorityButton priority={priority} setPriority={setPriority} />
        </View>
        
        <PaperInput label="Due" value={due} onChangeText={setDue} />
        <PaperInput label="Notification" value={notification} onChangeText={setNotification} /> 
        <PaperInput label="Note" value={note} onChangeText={setNote} multiline={true} numberOfLines={5}/>
        <Text>Created: {selectedItem?.when_created}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: MD3DarkTheme.colors.surface,
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  checkboxContainer: {
    alignItems: 'center',
    backgroundColor: MD3DarkTheme.colors.primary,
    marginTop: 5,
  },
  titleInput: {
    flex: 1,
  },
});