import React from 'react';
import { useWindowDimensions, View, Animated } from 'react-native';

function Paginator({ data, scrollX }: { data: any; scrollX: Animated.Value }) {
    const { width } = useWindowDimensions();

    return (
        <View className="flex-row self-center">
            {data.map((_: any, i: number) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [7, 20, 7],
                    extrapolate: 'clamp'
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                return (
                    <Animated.View
                        className="h-2 rounded-full bg-red-600 mx-2"
                        style={{ width: dotWidth, opacity }}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
}

export default Paginator;
