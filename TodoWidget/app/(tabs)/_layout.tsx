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

export default function TabLayout() {
  const { selectedItem, setSelectedItem} = useSelectedItem();
  const { deleteItem } = useWorkData();
  const router = useRouter(); 
  const { db } = useTodoDB();

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

  const deleteCurrentItem = () => {
    if (!selectedItem?.id) return;
    deleteItem(selectedItem.id);
    todosql.deleteTodo(db, selectedItem.id.toString());
    setSelectedItem(null);
    router.replace('/(tabs)');
  };

  const onReset = () => {
    console.log('Reset');
  };

  
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
                {/* <Ionicons.Button
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
                  onPress={() => console.log('Save')}
                /> */}
              </>
            ),
          }}
      />
    </Tabs>
  );
}
