import { useRef, useState} from "react";
import { View, StyleSheet, Pressable, NativeModules } from "react-native";
import { MD3DarkTheme, Card, Checkbox, List, Text, Button, FAB } from 'react-native-paper';
import AnimatedPressable from './AnimatedPressable';

const { WidgetModule } = NativeModules;

interface ItemProps {
    title: string;
    subtitle: string;
  }
  
export default function Item({ title, subtitle }: ItemProps) {
    const [checked, setChecked] = useState(false);
    const [priority, setPriority] = useState('');

    const priorityOptions = ['', 'H', 'M', 'L'];
    
    const priorityColors = ['#008000','#8B0000', '#FFFF00', '#008000']; // Darker Green, Darker Red, Brighter Yellow, Darker Green

    const handlePriorityChange = () => {
        const currentIndex = priorityOptions.indexOf(priority);
        const nextIndex = (currentIndex + 1) % priorityOptions.length;
        setPriority(priorityOptions[nextIndex]);
        
    };
    
    return (
        <AnimatedPressable 
        onPress={() => console.log("Update Widget")}
        style={styles.itemContainer}
        >
            <Card.Title
                title={title}
                subtitle={subtitle}
                style={styles.item}
                titleStyle={styles.itemText}
                subtitleStyle={styles.itemSubText}
                left={props => 
                <Checkbox 
                    status={checked ? 'checked' : 'unchecked'} 
                    onPress={() => setChecked(!checked)} 
                    color={MD3DarkTheme.colors.background}
                    uncheckedColor={MD3DarkTheme.colors.background}
                />}
                right={props => 
                    <Pressable 
                    onPress={() => handlePriorityChange()}
                    style={[styles.priorityButton, { backgroundColor: priorityColors[priorityOptions.indexOf(priority)] }]}
                    >
                        <Text style={styles.text}>{priority}</Text>
                    </Pressable>
                }
                rightStyle={styles.itemRight}
            />
        </AnimatedPressable>
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
    itemContainer:{
        backgroundColor: MD3DarkTheme.colors.primary,
        width: '80%',
        borderRadius: 10,
        height: 'auto'
    },
    item:{
        width: 'auto',
        borderRadius: 10,
        alignContent: 'flex-start',
    },
    itemText:{
        color: MD3DarkTheme.colors.onPrimary,
    },
    itemSubText:{
        color: MD3DarkTheme.colors.onPrimary,
    },
    itemRight:{
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