import { Stack } from "expo-router";
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";  

export default function RootLayout() {
  return (
    
    <SafeAreaProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <StatusBar
          backgroundColor={MD3DarkTheme.colors.background}
        />
        <Stack> 
          <Stack.Screen name="index" 
            options={{ title: "Todo List", 
            headerStyle: { backgroundColor: MD3DarkTheme.colors.primary }, 
            headerTitleStyle: { color: MD3DarkTheme.colors.background },
            headerTintColor: MD3DarkTheme.colors.background
        }} /> 
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
