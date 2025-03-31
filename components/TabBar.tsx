import { View, Text, Pressable, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Entypo } from 'expo-vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

export function TabBar({ state, descriptors, navigation } : BottomTabBarProps ) {
  const [dimensions, setDimensions] = useState({height: 20, width: 100})

  const buttonWidth = dimensions.width / state.routes.length;
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const icon = {
    index: (props: any) => <Entypo name="new-message" size={22}  {...props} />,
    calendar: (props: any) => <Entypo name="calendar" size={22}  {...props} />,
    settings: (props: any) => <Entypo name="cog" size={22}  {...props} />,
  };

  const TabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return{
      transform: [{translateX: TabPositionX.value}]
    }
  })
  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View style={[animatedStyle, {
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: '#2a785a',
        borderRadius: 30,
        marginHorizontal: 12,
        height: dimensions.height - 18,
        width: buttonWidth - 23,
      }]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          TabPositionX.value = withSpring(buttonWidth * index, {duration: 1300})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const scale = useSharedValue(0);
        
        useEffect(() => {
          scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {duration: 350})
        }, [scale, isFocused])

        const animatedTextStyle = useAnimatedStyle(() => {
          const opacity = interpolate(scale.value, [0, 1], [1, 0]);
          return {
            opacity
          }
        })
        const animatedIconStyle = useAnimatedStyle(() => {
          const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
          const top = interpolate( scale.value, [0, 1], [0, 5])
          return {
            transform: [{
              scale: scaleValue
            }],
            top
          }
        })
        return (
          <Pressable
            key={route.name}
            accessibilityRole='button'
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          > 
            <Animated.View style={animatedIconStyle}>
              {icon[route.name]({
                color: isFocused ? '#fff' : 'grey'
              })}
            </Animated.View>
            <Animated.Text style={[{ color: isFocused ? '#2a785a' : 'grey', fontSize: 11, fontWeight: 700, fontFamily: 'Bold' }, animatedTextStyle]}>
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '60%',
    height: 65,
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 35,
    borderCurve: 'circular',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
})