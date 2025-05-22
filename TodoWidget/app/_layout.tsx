import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";  
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createTableIfNotExists } from '../sqlite/todosql';
import { en, registerTranslation } from 'react-native-paper-dates';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { initializeNotifications } from '../services/notifications';

registerTranslation('en', en);


export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Initialize notifications
    initializeNotifications();

    // Handle notification taps when app is in background/quit state
    // TODO
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      if (data?.id) {
        // Navigate to the todo or show details
        // router.push(`/todo/${data.todoId}`);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <Suspense fallback={
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={MD3DarkTheme.colors.primary} />
      </View>
    }>
      <SQLiteProvider databaseName="todo.db" onInit={createTableIfNotExists} useSuspense={true}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <PaperProvider theme={MD3DarkTheme}>
              <StatusBar
                backgroundColor={MD3DarkTheme.colors.background}
              />
                <Stack> 
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </PaperProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
