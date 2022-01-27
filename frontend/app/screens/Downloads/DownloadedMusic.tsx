import {offlineTrackProps} from '@constants/Interfaces';
import {AudioDirectoryPath} from '@constants/saveconst';
import {MyText, SafeView} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import Header from './Header';

const {width} = Dimensions.get('window');

const DownloadedMusic = () => {
  const [downloadedMusic, setDownloadedMusic] = useState<any>([]);
  const {goToOfflineMusic} = useNavHelper();
  useEffect(() => {
    let isMounted = true;
    RNFS.readDir(AudioDirectoryPath)
      .then(files => {
        if (isMounted) {
          setDownloadedMusic(files);
        }
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
    return () => {
      isMounted = false;
    };
  }, [downloadedMusic]);

  return (
    <SafeView>
      <ScrollView>
        <Header />
        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {downloadedMusic?.map((item: offlineTrackProps, index: number) => (
              <View key={index}>
                <Pressable
                  onPress={() => {
                    goToOfflineMusic(item);
                  }}
                  style={{
                    backgroundColor: '#192f6a',
                    width: width / 2.2,
                    height: width / 3.2,
                    marginTop: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('@assets/images/trackimages/a.png')}
                    style={{
                      resizeMode: 'contain',
                      width: width / 2.2,
                    }}
                  />
                </Pressable>
                <View>
                  <MyText
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{
                      width: width / 2.2,
                    }}>
                    {item.name.substring(8)}
                  </MyText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default DownloadedMusic;

const styles = StyleSheet.create({
  dailyCarousel: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    resizeMode: 'contain',
    width: width * 0.95,
    borderRadius: 2,
    position: 'absolute',
  },
});
