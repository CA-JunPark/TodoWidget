import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ListRenderItemInfo } from "react-native";
import { NativeModules } from 'react-native';
import { MD3DarkTheme, FAB, Modal, Portal, TextInput } from 'react-native-paper';
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from 'react-native-reorderable-list';
import * as SQLite from 'expo-sqlite';
import * as todosql from '../../sqlite/todosql';
import Item, { ItemProps } from "../../components/Item";
import { useTodoDB } from '../../states/todoDB';
import { useWorkData } from '../../states/workData';
// const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

export default function Index() {
  const { workData, setWorkData, reorderItem, addItem } = useWorkData();
  const { db, setDb } = useTodoDB();
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');

  const initDB = async () => {
    try {
      const db = SQLite.openDatabaseSync('todo.db');
      setDb(db);
      const data = await todosql.getAllTodos(db);
      setWorkData(data?.filter(item => item.done === 0) ?? []);
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  };

  useEffect(() => {
    initDB();
  }, []);

  const handleReorderWork = async ({from, to}: ReorderableListReorderEvent) => {
    // local
    reorderItem(from, to);
    // sqlite
    await todosql.swapOrderIndices(db, workData[from].id, workData[to].id);
  };
  
  const renderItem = ({item}: ListRenderItemInfo<ItemProps>) => (
    <Item item={item} />
  );

  const handleAddTodo = async() => {
    showModal();
    viewAll();
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const uploadItem = async() => {
    hideModal();
    // trim input
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    // generate new item
    const newId = await todosql.generateMaxId(db);
    const newItem = {
      id: newId,
      title: trimmedInput,
      done: 0,
      note: '',
      priority: '',
      notification: '',
      due: '',
      when_created: new Date().toISOString().slice(0, 19).replace('T', ' '),
      order_index: 0,
    };
    // add to work data (top)
    if (db) {
      workData.forEach(async (item) => {
        item.order_index += 1;
        await todosql.updateOrderIndexById(db, item.id, item.order_index);
      });
    }
    addItem(newItem);
    // add to sqlite
    await todosql.addTodo(db, newItem);
    setInput('');
  };

  // For debugging
  const viewAll = async() => {
    if (db) {
      const allItems = await todosql.getAllTodos(db);
      console.log("SQLite data:");
      allItems?.forEach(item => console.log(`id: ${item.id}, title: ${item.title}, order_index: ${item.order_index}`));
    }
    console.log("Work data:");
    workData?.forEach(item => console.log(`id: ${item.id}, title: ${item.title}, order_index: ${item.order_index}`));
  };

  return (
    <View style={[styles.container]}>
      <Portal>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            onChangeText={(text) => setInput(text)}
            autoFocus={true}
            right={<TextInput.Icon icon="upload" onPress={() => uploadItem()} />}
          />
        </Modal>
      </Portal>
      <View style={[styles.listContainer]}>
        <ReorderableList
          data={workData}
          onReorder={handleReorderWork}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          extraData={workData}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => handleAddTodo()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: MD3DarkTheme.colors.surface,
    paddingTop:10,
  },
  listContainer: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 30,
    backgroundColor: MD3DarkTheme.colors.surface,
  },
  label:{
    textAlign: 'left',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalStyle: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    height: 60,
    flexDirection: 'row',
  },
  textInput: {
    width: '95%',
    height: 50,
    marginVertical: 10,
    fontSize: 20,
  },

});
