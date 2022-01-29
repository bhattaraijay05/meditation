import {MyText, SafeView} from '@elements/SharedElements';
import {Container} from '@elements/Styles';
import {useAudioHelper} from '@helpers/audio-helper';
import useNavHelper from '@helpers/navHelper';
import Player from '@screens/Player/Player';
import React, {useEffect} from 'react';
import {Alert, BackHandler, View} from 'react-native';
import RNFS from 'react-native-fs';
import MusicControl from 'react-native-music-control';
import OfflineMusicHeader from './OfflineMusicHeader';

const OfflineMusicPlayer = (props: any) => {
  const {path, name}: {path: string; name: string} = props.route.params;
  const {handleBack} = useNavHelper();

  const player = useAudioHelper({
    listSounds: [
      {
        type: 'undefined',
        path: path,
        name: name,
      },
    ],
  });

  useEffect(() => {
    const backAction = () => {
      if (player) {
        handleBack();
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const deleteOffline = async () => {
    await RNFS.unlink(path)
      .then(() => {
        handleBack();
        player.stop();
        MusicControl.resetNowPlaying();
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  const deletefromOffline = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this song from offline?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },

        {
          text: 'OK',
          onPress: () => {
            deleteOffline();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeView>
      <OfflineMusicHeader
        backHandler={handleBack}
        {...{name}}
        {...{deletefromOffline}}
      />
      <View style={[Container.centerContainer]}>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MyText fontSize={40} center>
            {name}
          </MyText>
        </View>

        <Player {...{player}} />
      </View>
    </SafeView>
  );
};

export default OfflineMusicPlayer;
