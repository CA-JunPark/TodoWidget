import React from 'react';
import { Pressable, Animated } from 'react-native';

type Props = React.ComponentProps<typeof Pressable> & {
    children: React.ReactNode;
    onPressIn?: () => void;
    onPressOut?: () => void;
};

const AnimatedPressable = ({ children, onPressIn, onPressOut, ...props }: Props) => {
    const scale = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
        onPressIn?.();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        onPressOut?.();
    };

    return (
        <Pressable {...props} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
        </Pressable>
    );
};

export default AnimatedPressable;
