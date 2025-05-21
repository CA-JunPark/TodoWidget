import { useRef } from "react";
import { Animated, Pressable, Text, StyleSheet } from "react-native";
import { MD3DarkTheme } from "react-native-paper";
import { debounce } from "lodash";
import { updatePriorityById } from '../sqlite/todosql';
import { useTodoDB } from '../states/todoDB';

// Priority button component
// Receives the current priority and a function to update the priority
// Shows the current priority and allows the user to cycle through the options

interface PriorityProps {
  priority: string;
  setPriority: (newPriority: string) => void;
  id: number;
}

export const PriorityButton = ({ priority, setPriority, id }: PriorityProps) => {
  const { db } = useTodoDB();

  // Reference to the animated scale value
  const animatedScale = useRef(new Animated.Value(1)).current;

  // List of priority options
  const priorityOptions = ['', 'H', 'M', 'L'];

  // List of priority colors
  const priorityColors = ['#008000', '#FF3737', '#FFFF00', '#008000'];

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
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    // Debounce the priority change event to prevent excessive SQL updates
    // The debounced function is called 100ms after the last priority change event
    // This allows the user to quickly cycle through priority options without triggering
    // excessive SQL updates
    debouncedHandlePriorityChange(nextIndex);
  };

  const updatePrioritySQL = async (nextIndex: number) => {
    await updatePriorityById(db, id, priorityOptions[nextIndex]).then(() => {
      console.log('Priority updated successfully');
    }).catch((error) => {
      console.error('Error updating priority:', error);
    });
  };

  const debouncedHandlePriorityChange = debounce(updatePrioritySQL, 100);

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
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: MD3DarkTheme.colors.onPrimary,
    },
});
