import { View, StyleSheet } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { MD3DarkTheme, Text, IconButton } from 'react-native-paper';
import { PaperInput } from '../../components/PaperInput';
import { useSelectedItem } from '../../states/selectedItem';
import { CustomCheckbox } from '../../components/customCheckbox';
import { PriorityButton } from '../../components/Priority';
import { DatePickerInput} from 'react-native-paper-dates';

//TODO onFocus 
//TODO open Calendar when set due date 
//TODO notification modal, Icon button

export default function EditItem() {
  const { selectedItem } = useSelectedItem();
  const [done, setDone] = useState(selectedItem?.done === 1);
  const [title, setTitle] = useState(selectedItem?.title || '');
  const [due, setDue] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [note, setNote] = useState(selectedItem?.note || '');
  const [notification, setNotification] = useState(selectedItem?.notification || '');
  const [notificationDate, setNotificationDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState(selectedItem?.priority || '');

  useEffect(() => {
    if (selectedItem) {
      setDone(selectedItem.done === 1);
      setTitle(selectedItem.title || '');
      setNote(selectedItem.note || '');
      setDue(selectedItem.due || '');
      // setDueDate(undefined) if due is empty string
      // otherwise, convert due string to Date object and setDueDate
      if (selectedItem.due === '') {
        setDueDate(undefined);
      } else {
        const newDueDate = new Date(selectedItem.due || '')
        setDueDate(newDueDate);
      }
      // if notification is empty string, set notificationDate to undefined
      // otherwise, convert notification string to Date object and setNotificationDate
      setNotification(selectedItem.notification || '');
      if (selectedItem.notification === '') {
        setNotificationDate(undefined);
      } else {
        const newNotificationDate = new Date(selectedItem.notification || '')
        setNotificationDate(newNotificationDate);
      }
      setPriority(selectedItem.priority || '');
    }
  }, [selectedItem]);

  // Create a debounced version of saveTextValue (delays execution by 500ms)
  // const debouncedSave = useMemo(
  //   () => debounce((value) => {
  //     saveTextValue(value);
  //     setStoredText(value);
  //   }, 500),
  //   []
  // );
  const changeDate = (d: Date | undefined) => {
    setDue(d ? d.toISOString().split('T')[0] : '');
    const newDate = new Date(d?.toISOString() || '')
    setDueDate(newDate);
  }

  const resetDate = () => {
    // TODO confirm
    setDue('');
    setDueDate(undefined);
  }
  const changeNotificationDate = (d: Date | undefined) => {
    setNotification(d ? d.toISOString().split('T')[0] : '');
    const newDate = new Date(d?.toISOString() || '')
    setNotificationDate(newDate);
  }

  const resetNotificationDate = () => {
    // TODO confirm
    setNotification('');
    setNotificationDate(undefined);
  }

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <View style={styles.checkboxContainer}>
                <CustomCheckbox checked={done} setChecked={setDone} />
            </View>
            <PaperInput label="Title" value={title} onChangeText={setTitle} style={styles.titleInput}/>
            <PriorityButton priority={priority} setPriority={setPriority} />
        </View>
        <View style={styles.dateContainer}>
          <DatePickerInput
            locale={'en'}
            label="Due Date"
            value={dueDate}
            onChange={changeDate}
            inputMode="start"
          />
          <IconButton icon="close" onPress={resetDate} />
        </View>
        <View style={styles.dateContainer}>
          <DatePickerInput
            locale={'en'}
            label="Notification Date"
            value={notificationDate}
            onChange={changeNotificationDate}
            inputMode="start"
          />
          <IconButton icon="close" onPress={resetNotificationDate} />
        </View>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height:30
  },
});
