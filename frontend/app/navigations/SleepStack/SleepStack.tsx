import {SleepStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
import Sleep from '@screens/Sleep/Sleep';
import React from 'react';

const Stack = createStackNavigator();

const SleepStack = () => {
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
        <Stack.Screen name={SleepStackRoutes.Sleep} component={Sleep} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SleepStack;
