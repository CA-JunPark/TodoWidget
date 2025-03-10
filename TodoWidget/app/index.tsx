import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NativeModules } from 'react-native';
import { MD3DarkTheme, Card, Checkbox, List, Text, Button } from 'react-native-paper';
import Item from "../components/Item";

const { WidgetModule } = NativeModules;
// <Button title="Update Widget" onPress={() => WidgetModule.updateWidget("New Text")} />

export default function Index() {
  return (
    <View style={[styles.container]}>
      <Item title="Card Title" subtitle="Due: 2025-03-09" />
    </View>
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
