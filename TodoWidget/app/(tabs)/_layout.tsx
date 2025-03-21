import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { MD3DarkTheme } from 'react-native-paper';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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
          title: 'Done',
          headerStyle: { backgroundColor: MD3DarkTheme.colors.primary }, 
          headerTitleStyle: { color: MD3DarkTheme.colors.background },
          headerTintColor: MD3DarkTheme.colors.background,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
        }}
      />
    </Tabs>
  );
}
