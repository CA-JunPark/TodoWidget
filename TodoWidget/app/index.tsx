import { useRef, useState } from "react";
import { View, StyleSheet, Button, ListRenderItemInfo } from "react-native";
import { NativeModules } from 'react-native';
import { MD3DarkTheme, Text, FAB } from 'react-native-paper';
import { useRouter } from "expo-router";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from 'react-native-reorderable-list';

import Item, { ItemProps } from "../components/Item";

// const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

const seedData: ItemProps[] = [
  { id: "7878", title: "Card Title", subtitle: "Due: 2025-03-09" },
  { id: "0", title: "Card 0", subtitle: "Due: 2025-03-00" },
  { id: "1", title: "Card 1", subtitle: "Due: 2025-03-01" },
  { id: "2", title: "Card 2", subtitle: "Due: 2025-03-02" },
  { id: "3", title: "Card 3", subtitle: "Due: 2025-03-03" },
  { id: "4", title: "Card 4", subtitle: "Due: 2025-03-04" },
  { id: "5", title: "Card 5", subtitle: "Due: 2025-03-05" },
  { id: "6", title: "Card 6", subtitle: "Due: 2025-03-06" },
  { id: "7", title: "Card 7", subtitle: "Due: 2025-03-07" },
  { id: "8", title: "Card 8", subtitle: "Due: 2025-03-08" },
  { id: "9", title: "Card 9", subtitle: "Due: 2025-03-09" },
  { id: "10", title: "Card 10", subtitle: "Due: 2025-03-10" },
  { id: "11", title: "Card 11", subtitle: "Due: 2025-03-11" },
  { id: "12", title: "Card 12", subtitle: "Due: 2025-03-12" },
  { id: "13", title: "Card 13", subtitle: "Due: 2025-03-13" },
  { id: "14", title: "Card 14", subtitle: "Due: 2025-03-14" },
];

export default function Index() {
  const router = useRouter();
  const [data, setData] = useState(seedData);

  const handleReorder = ({from, to}: ReorderableListReorderEvent) => {
    setData(value => reorderItems(value, from, to));
    console.log("Reorder", from, to);
  };

  const renderItem = ({item}: ListRenderItemInfo<ItemProps>) => (
    <Item {...item} />
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.listContainer]}>
        <Text variant="headlineLarge">Work</Text>
        <ReorderableList
          data={data}
          onReorder={handleReorder}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={[styles.listContainer]}>
        <Text variant="headlineLarge">Done</Text>
        <ReorderableList
          data={data}
          onReorder={handleReorder}
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
