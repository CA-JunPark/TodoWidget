import { useRef, useState } from "react";
import { View, StyleSheet, Button, ListRenderItemInfo } from "react-native";
import { NativeModules } from 'react-native';
import { MD3DarkTheme } from 'react-native-paper';
import { useRouter } from "expo-router";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
  useReorderableDrag,
} from 'react-native-reorderable-list';

import Item, { ItemProps } from "../components/Item";

const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

const seedData: ItemProps[] = [
  { id: "7878", title: "Card Title", subtitle: "Due: 2025-03-09" },
  { id: "0", title: "Card 0", subtitle: "Due: 2025-03-00" },
  { id: "1", title: "Card 1", subtitle: "Due: 2025-03-01" },
  { id: "2", title: "Card 2", subtitle: "Due: 2025-03-02" },
  { id: "3", title: "Card 3", subtitle: "Due: 2025-03-03" },
  { id: "4", title: "Card 4", subtitle: "Due: 2025-03-04" },
  { id: "5", title: "Card 5", subtitle: "Due: 2025-03-05" },
];

export default function Index() {
  const router = useRouter();
  const [data, setData] = useState(seedData);

  const handleReorder = ({from, to}: ReorderableListReorderEvent) => {
    setData(value => reorderItems(value, from, to));
  };

  const renderItem = ({item}: ListRenderItemInfo<ItemProps>) => (
    <Item {...item} />
  );

  return (
    // <View style={[styles.container]}>
    //   <Item id="7878" title="Card Title" subtitle="Due: 2025-03-09" />
    //   <Button title="Go to Reorderable List" onPress={() => router.push('./reorderableList')} />
    // </View>
      <ReorderableList
        data={data}
        onReorder={handleReorder}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MD3DarkTheme.colors.surface,
  },
  text: {
    color: MD3DarkTheme.colors.onPrimary,
  },
});
