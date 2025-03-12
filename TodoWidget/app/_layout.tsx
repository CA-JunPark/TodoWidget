import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";  
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
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
  );
}
