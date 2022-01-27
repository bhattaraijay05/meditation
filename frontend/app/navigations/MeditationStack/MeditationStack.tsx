import {MeditationStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
import MeditationHome from '@screens/MeditationPage/MeditationHome';
import React from 'react';

const Stack = createStackNavigator();

const MeditationStack = () => {
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
        <Stack.Screen
          name={MeditationStackRoutes.Meditation}
          component={MeditationHome}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MeditationStack;
