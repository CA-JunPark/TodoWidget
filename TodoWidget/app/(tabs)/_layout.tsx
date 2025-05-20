import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { MD3DarkTheme } from 'react-native-paper';
import { useSelectedItem } from '../../states/selectedItem';
import { useWorkData } from '../../states/workData';
import { useRouter } from 'expo-router';
import { useTodoDB } from '@/states/todoDB';
import * as todosql from '../../sqlite/todosql';
import { Alert } from 'react-native';
import { useEditedItem } from '../../states/editedItem';
import { ItemProps } from '@/components/Item';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { selectedItem, setSelectedItem} = useSelectedItem();
  const { deleteItem } = useWorkData();
  const router = useRouter(); 
  const { db } = useTodoDB();
  const { done, title, due, note, priority, notification, setEditedItem } = useEditedItem();

  const onDelete = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: deleteCurrentItem },
      ]
    );
  };

  const onSave = async () => {
    if (!selectedItem?.id) return;
    setIsUpdating(true);
    try {
      const editedItem: ItemProps = {
        id: selectedItem?.id ?? 0,
        done: done ? 1 : 0,
        title: title ?? '',
        due: due ?? '',
        note: note ?? '',
        priority: priority ?? '',
        notification: notification ?? '',
        when_created: selectedItem?.when_created ?? '',
        order_index: selectedItem?.order_index ?? 0,
      };
      await todosql.updateTodo(db, editedItem);
      setSelectedItem(editedItem);
    } catch (error: any) {
      Alert.alert(
        "Error",
        `Error updating todo: ${error}`,
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCurrentItem = () => {
    if (!selectedItem?.id) return;
    deleteItem(selectedItem.id);
    todosql.deleteTodo(db, selectedItem.id.toString());
    setSelectedItem(null);
    router.replace('/(tabs)');
  };

  const onReset = () => {
    console.log('Reset');
    setEditedItem({
      done: selectedItem?.done === 1,
      title: selectedItem?.title,
      due: selectedItem?.due,
      dueDate: selectedItem?.due ? new Date(selectedItem.due) : undefined,
      note: selectedItem?.note,
      notification: selectedItem?.notification,
      notificationDate: selectedItem?.notification ? new Date(selectedItem.notification) : undefined,
      priority: selectedItem?.priority,
    });
  };

  if (isUpdating) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', tabBarHideOnKeyboard: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo List",
          headerStyle: { backgroundColor: MD3DarkTheme.colors.primary }, 
          headerTitleStyle: { color: MD3DarkTheme.colors.background },
          headerTintColor: MD3DarkTheme.colors.background,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          title: 'Done List',
          headerStyle: { backgroundColor: MD3DarkTheme.colors.primary }, 
          headerTitleStyle: { color: MD3DarkTheme.colors.background },
          headerTintColor: MD3DarkTheme.colors.background,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
        }}
        />
      <Tabs.Screen
        name="editItem"
        options={{
            title: 'Edit Item',
            headerStyle: { backgroundColor: MD3DarkTheme.colors.primary },
            headerTitleStyle: { color: MD3DarkTheme.colors.background },
            headerTintColor: MD3DarkTheme.colors.background,
            // tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
            // tabBarButton: () => null,
            href: null,
            headerRight: () => (
              <>
                <FontAwesome.Button
                  name="trash-o"
                  size={28}
                  backgroundColor={MD3DarkTheme.colors.primary}
                  color={MD3DarkTheme.colors.background}
                  onPress={() => onDelete()}
                />
                <Ionicons.Button
                  name="reload"
                  size={28}
                  backgroundColor={MD3DarkTheme.colors.primary}
                  color={MD3DarkTheme.colors.background}
                  onPress={() => onReset()}
                />
                <FontAwesome.Button
                  name="save"
                  size={28}
                  backgroundColor={MD3DarkTheme.colors.primary}
                  color={MD3DarkTheme.colors.background}
                  onPress={() => onSave()}
                />
              </>
            ),
          }}
      />
    </Tabs>
  );
}
