import {ProfileStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@screens/Profile/Profile';
import React from 'react';

const Stack = createStackNavigator();

const ProfileStack = () => {
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
        <Stack.Screen name={ProfileStackRoutes.Profile} component={Profile} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileStack;
