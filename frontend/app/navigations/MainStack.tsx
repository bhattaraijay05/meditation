import {MainStackRoutes} from '@constants/screens';
import useStyle from '@hooks/useStyle';
import {createStackNavigator} from '@react-navigation/stack';
import DownloadedMusic from '@screens/Downloads/DownloadedMusic';
import OfflineMusicPlayer from '@screens/Downloads/OfflineMusicPlayer';
import PlayerPage from '@screens/MusicView/PlayerPage';
import TrackUpdate from '@shared/Inputs/TrackUpdate';
import TrackUpload from '@shared/Inputs/TrackUpload';
import MusicPage from '@shared/MusicPage';
import React from 'react';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
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
        <Stack.Screen name={MainStackRoutes.MainTab} component={MainTab} />
      </Stack.Group>

      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={MainStackRoutes.MainMusicPage}
          component={PlayerPage}
        />
        <Stack.Screen
          name={MainStackRoutes.MainDownloadedMusicPage}
          component={OfflineMusicPlayer}
        />
        <Stack.Screen
          name={MainStackRoutes.MainDownloadedMusicListPage}
          component={DownloadedMusic}
        />
        <Stack.Screen
          name={MainStackRoutes.MusicDescription}
          component={MusicPage}
        />
        <Stack.Screen
          name={MainStackRoutes.TrackUpload}
          component={TrackUpload}
        />
        <Stack.Screen
          name={MainStackRoutes.TrackUpdate}
          component={TrackUpdate}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
