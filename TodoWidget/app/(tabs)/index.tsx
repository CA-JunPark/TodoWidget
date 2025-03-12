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

import Item, { ItemProps } from "../../components/Item";

// const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

const seedData = [
  { id: "7878", title: "Card Title", subtitle: "Due: 2025-03-09", isDone: false },
  { id: "0", title: "Card 0", subtitle: "Due: 2025-03-00", isDone: false },
  { id: "1", title: "Card 1", subtitle: "Due: 2025-03-01", isDone: false },
  { id: "2", title: "Card 2", subtitle: "Due: 2025-03-02", isDone: false },
  { id: "3", title: "Card 3", subtitle: "Due: 2025-03-03", isDone: false },
  { id: "4", title: "Card 4", subtitle: "Due: 2025-03-04", isDone: false },
  { id: "5", title: "Card 5", subtitle: "Due: 2025-03-05", isDone: false },
  { id: "6", title: "Card 6", subtitle: "Due: 2025-03-06", isDone: false },
];

export default function Index() {
  
  const initDB = async () => {
    const db = await SQLite.openDatabaseAsync('todo.db');
    await db.execAsync(`
      INSERT INTO todo (title, due, done) VALUES ('New Item', 'Due: 2025-03-12', 0);
    `);
    const result1 = await db.getAllAsync("SELECT * FROM todo");
    console.log("Get all", result1);
    await db.execAsync(`DELETE FROM todo;`)
    const result2 = await db.getAllAsync("SELECT * FROM todo");
    console.log("Get all", result2);
  };
  useEffect(() => {
    initDB();
  }, []);


  const router = useRouter();
  const [workData, setWorkData] = useState(seedData);

  const handleReorderWork = ({from, to}: ReorderableListReorderEvent) => {
    setWorkData(value => reorderItems(value, from, to));
    console.log("Reorder", from, to);
  };

  const renderItem = ({item}: ListRenderItemInfo<ItemProps>) => (
    <Item {...item} />
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.listContainer]}>
        <ReorderableList
          data={workData}
          onReorder={handleReorderWork}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
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
