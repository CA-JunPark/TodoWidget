import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";  
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function RootLayout() {
  const createDatabaseIfNotExists = async (db: SQLite.SQLiteDatabase) => {
    console.log("Creating database If Needed");
    await db.execAsync(`CREATE TABLE IF NOT EXISTS todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      done INTEGER DEFAULT 0,
      title TEXT DEFAULT NULL,
      note TEXT DEFAULT "",
      priority TEXT DEFAULT "",
      notification TEXT DEFAULT "",
      due TEXT DEFAULT "",
      when_created TEXT DEFAULT "",
      order_index INTEGER DEFAULT 0
    );`);
  };
  return (
    <Suspense fallback={
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={MD3DarkTheme.colors.primary} />
      </View>
    }>
      <SQLiteProvider databaseName="todo.db" onInit={createDatabaseIfNotExists} useSuspense={true}>
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
