import React, { memo, useRef, useState } from "react";
import { View, StyleSheet, Pressable, NativeModules, Animated } from "react-native";
import { MD3DarkTheme, Card, Checkbox, Text } from 'react-native-paper';
import AnimatedPressable from './AnimatedPressable';
import { useSelectedItem } from '../states/selectedItem';
import { useReorderableDrag } from 'react-native-reorderable-list';
import { useRouter } from 'expo-router';
import { CustomCheckbox } from './customCheckbox';
import { PriorityButton } from './Priority';

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
    
    const handlePress = () => {
        setSelectedItem(item);
        router.push('/(tabs)/editItem');
    };

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
                left={props => CustomCheckbox({checked, setChecked})}
                right={props => (
                    <PriorityButton priority={priority} setPriority={setPriority} />
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
