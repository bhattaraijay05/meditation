import colors from '@constants/colors';
import {MainTabRoutes} from '@constants/screens';
import {BottomTabContext} from '@context/BottomTabContext';
import {MyText} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PomodoroClock from '@screens/Pomodoro/PomodoroClock';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {Keyboard, Platform, Pressable, StatusBar} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack/HomeStack';
import MeditationStack from './MeditationStack/MeditationStack';
import ProfileStack from './ProfileStack/ProfileStack';
import SleepStack from './SleepStack/SleepStack';
const Tab = createBottomTabNavigator();

const AnimatedPress = Animated.createAnimatedComponent(Pressable);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type MyTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

type ClockProps = {
  1: 'one';
  2: 'two';
  3: 'three';
  4: 'four';
  5: 'five';
  6: 'six';
  7: 'seven';
  8: 'eight';
  9: 'nine';
  10: 'ten';
  11: 'eleven';
  12: 'twelve';
};

const clock: ClockProps = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
};

const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {color} = useStyle();

  const currentTime = moment().format('LT');

  //@ts-ignore
  const time =
    //@ts-ignore
    clock[
      Number(currentTime) > 9
        ? currentTime.substring(0, 2)
        : currentTime.substring(0, 1)
    ];

  const {tabHeight} = useContext(BottomTabContext);
  let iconName: string;

  const btStyle = useAnimatedStyle(() => {
    return {
      height: tabHeight.value,
    };
  });

  useEffect(() => {
    let keyboardEventListeners: any;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => (tabHeight.value = 0)),
        Keyboard.addListener('keyboardDidHide', () => (tabHeight.value = 60)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener: any) =>
            eventListener.remove(),
          );
      }
    };
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={color.main}
        barStyle={
          color.main === colors.darkTheme ? 'light-content' : 'dark-content'
        }
      />
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            elevation: 0,
            backgroundColor: color.main,
          },
          btStyle,
        ]}>
        {state.routes.map((route: any, index: any) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          switch (index) {
            case 0:
              iconName = 'home';
              break;
            case 1:
              iconName = 'power-sleep';
              break;
            case 2:
              iconName = 'meditation';
              break;
            case 3:
              iconName = `clock-time-${time}`;
              break;
            case 4:
              iconName = 'human-greeting';
              break;
            default:
              break;
          }

          return (
            <AnimatedPress
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              key={index}
              style={[
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 8,
                },
              ]}>
              <AnimatedIcon
                name={iconName}
                size={25}
                style={[
                  {
                    backgroundColor: isFocused ? color.iconColor : color.main,
                    padding: 7,
                    borderRadius: 10,
                    color: isFocused ? color.white : color.inverse,
                  },
                ]}
              />
              <MyText
                style={{
                  color: color.grey,
                  fontSize: 13,
                }}
                center>
                {label}
              </MyText>
            </AnimatedPress>
          );
        })}
      </Animated.View>
    </>
  );
};

function MainTab() {
  return (
    <>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name={MainTabRoutes.HomeStack}
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name={MainTabRoutes.SleepStack}
          component={SleepStack}
          options={{
            tabBarLabel: 'Sleep',
          }}
        />
        <Tab.Screen
          name={MainTabRoutes.MeditationStack}
          component={MeditationStack}
          options={{
            tabBarLabel: 'Meditation',
          }}
        />
        <Tab.Screen
          name={MainTabRoutes.PomodoroStack}
          component={PomodoroClock}
          options={{
            tabBarLabel: 'Pomodoro',
          }}
        />
        <Tab.Screen
          name={MainTabRoutes.ProfileStack}
          component={ProfileStack}
          options={{
            tabBarLabel: 'Account',
          }}
        />
      </Tab.Navigator>
    </>
  );
}
export default MainTab;
