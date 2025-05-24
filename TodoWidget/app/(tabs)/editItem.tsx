import { View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { MD3DarkTheme, Text, IconButton } from 'react-native-paper';
import { PaperInput } from '../../components/PaperInput';
import { useSelectedItem } from '../../states/selectedItem';
import { CustomCheckbox } from '../../components/customCheckbox';
import { PriorityButton } from '../../components/Priority';
import { DatePickerInput } from 'react-native-paper-dates';
import { Alert } from 'react-native';
import { useEditedItem } from '../../states/editedItem';

export default function EditItem() {
  const { selectedItem } = useSelectedItem();
  const { 
    done, 
    title, 
    due, 
    note, 
    priority, 
    setEditedDone,
    setEditedTitle,
    setEditedDue,
    setEditedDueDate,
    setEditedNote,
    setEditedPriority,
    setEditedItem,
  } = useEditedItem();

  // Memoize the parsed dates to prevent unnecessary re-renders
  const { dueDate: parsedDueDate, } = useMemo(() => ({
    dueDate: due ? new Date(due) : undefined,
  }), [due]);

  // Update state when selectedItem changes
  useEffect(() => {
    if (!selectedItem) return;
    setEditedItem({
      done: selectedItem.done === 1,
      title: selectedItem.title || '',
      due: selectedItem.due || '',
      note: selectedItem.note || '',
      priority: selectedItem.priority || '',
      dueDate: selectedItem.due ? new Date(selectedItem.due) : undefined,
    });
  }, [selectedItem]);

  // Memoize handlers with useCallback
  const handleDateChange = useCallback((date: Date | undefined) => {
    const dateString = date ? date.toISOString().split('T')[0] : '';
    setEditedDue(dateString);
    setEditedDueDate(date);
  }, [setEditedDue, setEditedDueDate]);
  
  const resetDate = useCallback(() => {
    setEditedDue('');
    setEditedDueDate(undefined);
  }, [setEditedDue, setEditedDueDate]);

  // Memoize alert dialogs
  const confirmResetDate = useCallback(() => {
    Alert.alert(
      "Reset Date",
      "Are you sure you want to reset the due date?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: resetDate },
      ]
    );
  }, [resetDate]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} >
        <View style={styles.titleContainer}>
            <View style={styles.checkboxContainer}>
                <CustomCheckbox checked={done} setChecked={(checked) => setEditedDone(checked)} id={selectedItem?.id} />
            </View>
            <PaperInput label="Title" value={title} onChangeText={(text) => setEditedTitle(text)} style={styles.titleInput}/>
            <PriorityButton priority={priority} setPriority={(priority) => setEditedPriority(priority)} id={selectedItem?.id} />
        </View>
        <View style={styles.dateContainer}>
          <DatePickerInput
            locale={'en'}
            label="Due Date"
            value={parsedDueDate}
            onChange={handleDateChange}
            inputMode="start"
          />
          <IconButton icon="close" onPress={confirmResetDate} />
        </View>
        <View style={styles.noteContainer}>
          <PaperInput label="Note" value={note} onChangeText={(text) => setEditedNote(text)} multiline={true} numberOfLines={5} style={styles.noteInput}/>
        </View>
      </ScrollView>
      <View style={styles.createdTextContainer}>
        <Text>Created: {selectedItem?.when_created}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    backgroundColor: MD3DarkTheme.colors.surface,
    justifyContent: 'flex-start',
    gap: 15,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow:1,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 30,
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
    marginVertical: 30,
    height:30,
  },
  noteContainer: {
    gap: 10,
    marginBottom: 15, 
    height: 180,
  },
  noteInput: {
    minHeight: 140,
  },
  createdTextContainer: {
    alignSelf: 'center',
    marginBottom: 15,
  },
});
