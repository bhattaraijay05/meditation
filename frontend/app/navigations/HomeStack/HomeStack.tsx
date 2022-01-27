import {HomeStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '@screens/HomePage/Home';
import TopicMusic from '@screens/HomePage/TopicMusic';
import React from 'react';

const Stack = createStackNavigator();

const HomeStack = () => {
  const {color} = useStyle();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.main,
          elevation: 0,
        },
        headerTintColor: color.textColor,
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerMode: 'float',
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name={HomeStackRoutes.Home} component={Home} />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={HomeStackRoutes.TopicMusic}
          component={TopicMusic}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
