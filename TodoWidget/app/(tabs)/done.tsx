import { useRef, useState } from "react";
import { View, StyleSheet, Button, ListRenderItemInfo } from "react-native";
import { NativeModules } from 'react-native';
import { MD3DarkTheme, Text, FAB } from 'react-native-paper';
import { useRouter } from "expo-router";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from 'react-native-reorderable-list';

import Item, { ItemProps } from "../../components/Item";

// const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

const seedData = [
  { id: "7", title: "Card 7", subtitle: "Due: 2025-03-07", isDone: true },
  { id: "8", title: "Card 8", subtitle: "Due: 2025-03-08", isDone: true },
  { id: "9", title: "Card 9", subtitle: "Due: 2025-03-09", isDone: true },
  { id: "10", title: "Card 10", subtitle: "Due: 2025-03-10", isDone: true },
  { id: "11", title: "Card 11", subtitle: "Due: 2025-03-11", isDone: true },
  { id: "12", title: "Card 12", subtitle: "Due: 2025-03-12", isDone: true },
  { id: "13", title: "Card 13", subtitle: "Due: 2025-03-13", isDone: true },
  { id: "14", title: "Card 14", subtitle: "Due: 2025-03-14", isDone: true },
];

export default function Index() {
  const router = useRouter();
  const [doneData, setDoneData] = useState(seedData);

  const handleReorderDone = ({from, to}: ReorderableListReorderEvent) => {
    setDoneData(value => reorderItems(value, from, to));
    console.log("Reorder", from, to);
  };

  const renderItem = ({item}: ListRenderItemInfo<ItemProps>) => (
    <Item {...item} />
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.listContainer]}>
        <ReorderableList
          data={doneData}
          onReorder={handleReorderDone}
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
