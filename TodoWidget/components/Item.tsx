import React, { memo, useRef, useState } from "react";
import { View, StyleSheet, Pressable, NativeModules, Animated } from "react-native";
import { MD3DarkTheme, Card, Checkbox, Text } from 'react-native-paper';
import AnimatedPressable from './AnimatedPressable';
import { useSelectedItem } from '../states/selectedItem';
import { useReorderableDrag } from 'react-native-reorderable-list';
import { useRouter } from 'expo-router';

const { WidgetModule } = NativeModules;

export interface ItemProps {
    id: number;
    done: number | null;
    title: string | null;
    note: string | null;
    priority: string | null;
    notification: string | null;
    due: string | null;
    when_created: string | null;
    order_index: number | null;
}

// React.memo ensures that the Item component only re-renders when its item prop changes.
// TODO: put items in a state
const Item: React.FC<{item: ItemProps}> = memo(({item}) => {
    const drag = useReorderableDrag();
    const router = useRouter();
    
    const { setSelectedItem } = useSelectedItem();
    const [checked, setChecked] = useState(item.done === 1);
    const [priority, setPriority] = useState(item.priority ?? '');
    
    const priorityOptions = ['', 'H', 'M', 'L'];
    const priorityColors = ['#008000', '#8B0000', '#FFFF00', '#008000'];

    /**
     * Update the priority immediately
     * Trigger a simple scale animation
     */
    const handlePriorityChange = () => {
        const currentIndex = priorityOptions.indexOf(priority);
        const nextIndex = (currentIndex + 1) % priorityOptions.length;
        setPriority(priorityOptions[nextIndex]);

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

    const handlePress = () => {
        setSelectedItem(item);
        router.push('/(tabs)/editItem');
    };

    const animatedScale = useRef(new Animated.Value(1)).current;

    return (
        <AnimatedPressable 
            onPress={() => handlePress()}
            style={styles.itemContainer}
            onLongPress={drag}
        >
            <Card.Title
                title={item.title}
                subtitle={item.due}
                style={styles.item}
                titleStyle={styles.itemText}
                subtitleStyle={styles.itemSubText}
                left={props => (
                    <Checkbox 
                        status={checked ? 'checked' : 'unchecked'} 
                        onPress={() => setChecked(!checked)} 
                        color={MD3DarkTheme.colors.background}
                        uncheckedColor={MD3DarkTheme.colors.background}
                    />
                )}
                right={props => (
                    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
                        <Pressable 
                            onPress={handlePriorityChange}
                            style={[
                                styles.priorityButton, 
                                { backgroundColor: priorityColors[priorityOptions.indexOf(priority)] }
                            ]}
                        >
                            <Text style={styles.itemText}>{priority}</Text>
                        </Pressable>
                    </Animated.View>
                )}
                rightStyle={styles.itemRight}
            />
        </AnimatedPressable>
    );
});

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: MD3DarkTheme.colors.primary,
        borderRadius: 10,
        height: 'auto',
        width: 300,
        marginVertical: 11,
    },
    item: {
        borderRadius: 10,
        alignContent: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: MD3DarkTheme.colors.onPrimary,
    },
    itemSubText: {
        color: MD3DarkTheme.colors.onPrimary,
    },
    itemRight: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priorityButton: {
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Item;
