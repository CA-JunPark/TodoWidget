import { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Button, ListRenderItemInfo } from "react-native";
import { NativeModules } from 'react-native';
import { MD3DarkTheme, Text, FAB } from 'react-native-paper';
import { useRouter } from "expo-router";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from 'react-native-reorderable-list';
import * as SQLite from 'expo-sqlite';
import * as todosql from '../../sqlite/todosql';
import Item, { ItemProps } from "../../components/Item";

// const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

const seedData: ItemProps[] = [
  { id: 7878, done: 0, title: 'Todo Item 1', note: '', priority: '', notification: '', due: '2021-12-22', when_created: '', order_index: 0 },
  { id: 0, done: 0, title: 'Todo Item 2', note: '', priority: '', notification: '', due: '2021-12-23', when_created: '', order_index: 1 },
  { id: 1, done: 0, title: 'Todo Item 3', note: '', priority: '', notification: '', due: '2021-12-24', when_created: '', order_index: 2 },
  { id: 2, done: 0, title: 'Todo Item 4', note: '', priority: '', notification: '', due: '2021-12-25', when_created: '', order_index: 3 },
  { id: 3, done: 0, title: 'Todo Item 5', note: '', priority: '', notification: '', due: '2021-12-26', when_created: '', order_index: 4 },
  { id: 4, done: 0, title: 'Todo Item 6', note: '', priority: '', notification: '', due: '2021-12-27', when_created: '', order_index: 5 },
  { id: 5, done: 0, title: 'Todo Item 7', note: '', priority: '', notification: '', due: '2021-12-28', when_created: '', order_index: 6 },
  { id: 6, done: 0, title: 'Todo Item 8', note: '', priority: '', notification: '', due: '2021-12-29', when_created: '', order_index: 7 },
];

export default function Index() {
  const router = useRouter();
  const [workData, setWorkData] = useState(seedData);
  const [resultCount, setResultCount] = useState(0);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  const initDB = () => {
    try {
      const db = SQLite.openDatabaseSync('todo.db');
      setDb(db);
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  };

  useEffect(() => {
    initDB();
  }, []);

  const handleReorderWork = ({from, to}: ReorderableListReorderEvent) => {
    setWorkData(value => reorderItems(value, from, to));
    console.log("Reorder", from, to);
  };

  const renderItem = ({item}: ListRenderItemInfo<ItemProps>) => (
    <Item item={item} />
  );

  const handleAddTodo = async() => {
    console.log("Adding new todo");
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.listContainer]}>
        <ReorderableList
          data={workData}
          onReorder={handleReorderWork}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
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
});
