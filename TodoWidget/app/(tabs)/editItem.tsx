import { View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { MD3DarkTheme, Checkbox } from 'react-native-paper';
import PaperInput from '../../components/paperInput';
import { useSelectedItem } from '../../states/selectedItem';


export default function EditItem() {
  const { selectedItem } = useSelectedItem();
  const [title, setTitle] = useState(selectedItem?.title || '');
  const [due, setDue] = useState(selectedItem?.due || '');
  const [note, setNote] = useState(selectedItem?.note || '');
  const [notification, setNotification] = useState(selectedItem?.notification || '');

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title || '');
      setDue(selectedItem.due || '');
      setNote(selectedItem.note || '');
      setNotification(selectedItem.notification || '');
    }
  }, [selectedItem]);


  return (
    <View style={styles.container}>
      <PaperInput label="Title" value={title} onChangeText={setTitle} />
      <PaperInput label="Due" value={due} onChangeText={setDue} />
      <PaperInput label="Note" value={note} onChangeText={setNote} />
      <PaperInput label="Notification" value={notification} onChangeText={setNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: MD3DarkTheme.colors.surface,
  },
});