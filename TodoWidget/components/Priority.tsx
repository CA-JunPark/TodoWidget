import { useRef } from "react";
import { Animated, Pressable, Text, StyleSheet } from "react-native";
import { MD3DarkTheme } from "react-native-paper";

// Priority button component
// Receives the current priority and a function to update the priority
// Shows the current priority and allows the user to cycle through the options

interface PriorityProps {
  priority: string;
  setPriority: (newPriority: string) => void;
}


export const PriorityButton = ({ priority, setPriority }: PriorityProps) => {
  // Reference to the animated scale value
  const animatedScale = useRef(new Animated.Value(1)).current;

  // List of priority options
  const priorityOptions = ['', 'H', 'M', 'L'];

  // List of priority colors
  const priorityColors = ['#008000', '#8B0000', '#FFFF00', '#008000'];

  // Handle the priority change event
  const handlePriorityChange = () => {
    // Find the index of the current priority
    const currentIndex = priorityOptions.indexOf(priority);

    // Calculate the next index
    const nextIndex = (currentIndex + 1) % priorityOptions.length;

    // Set the new priority
    setPriority(priorityOptions[nextIndex]);

    // Animate the button scale
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Render the priority button
  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <Pressable onPress={handlePriorityChange} style={[
        styles.priorityButton, 
        { backgroundColor: priorityColors[priorityOptions.indexOf(priority)] }
      ]}>
        <Text style={styles.itemText}>{priority}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    priorityButton: {
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: MD3DarkTheme.colors.onPrimary,
    },
});