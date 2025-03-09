import { Button, Text, View } from "react-native";
import { NativeModules } from 'react-native';

const { WidgetModule } = NativeModules;

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />
    </View>
  );
}
