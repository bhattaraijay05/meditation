import {categories} from '@constants/categories';
import {CategoryProps, TrackProps} from '@constants/Interfaces';
import {MyText, SafeView} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import {tracks} from '@screens/MusicView/tracks';
import MusicCard from '@shared/MusicCard';
import {HomeSkeleton} from '@shared/Skeletons';
import UserCategory from '@shared/UserCategory';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MeditationHome = () => {
  const {color} = useStyle();
  const [selected, setSelected] = useState(categories[0]);
  const [data, setData] = useState<any>([]);
  const {goToMusicDesc, goToDownloadedList} = useNavHelper();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    wait(100).then(() => {
      setRefreshing(false);
      setData(tracks);
    });
  }, []);

  const fetchItem = (cat: string) => {
    setData([]);
    wait(100).then(() => {
      if (cat === 'all') {
        setData(tracks.splice(0, 8));
      } else {
        setData(
          tracks.filter((track: TrackProps) => track.category.includes(cat)),
        );
      }
    });
  };

  const itemSelected = (item: CategoryProps) => {
    setSelected(item);
    fetchItem(item.category);
  };

  useEffect(() => {
    setTimeout(() => {
      setData(tracks);
    }, 2000);
    return () => {
      setData([]);
    };
  }, []);

  return (
    <SafeView>
      <ScrollView
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={color.main}
            colors={[color.inverse]}
          />
        }>
        <View
          style={{
            marginTop: 40,
            paddingHorizontal: 10,
            width: width * 0.8,
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <MyText bold title center>
            Meditate
          </MyText>
          <MyText color={color.grey} center fontSize={13}>
            We can learn how to recognize when our minds are doing their normal
            everyday acrobatics.
          </MyText>
        </View>
        <View style={{height: 80}}>
          <UserCategory {...{itemSelected}} {...{selected}} />
        </View>
        <Pressable
          onPress={goToDownloadedList}
          style={{
            width: width * 0.95,
            alignSelf: 'center',
            height: width / 2,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: 20,
            marginTop: 30,
            position: 'relative',
          }}>
          <Image
            source={require('../../assets/images/bg.png')}
            style={styles.dailyCarousel}></Image>
          <View>
            <MyText color={color.white} fontSize={25}>
              Daily Thoughts
            </MyText>
            <MyText color={color.white}>Meditation 5-10Min</MyText>
          </View>
          <View
            style={[
              {
                backgroundColor: color.main,
                borderRadius: 25,
                padding: 10,
                marginTop: 15,
                paddingHorizontal: 25,
              },
            ]}>
            <MyText color={color.textColor}>Start</MyText>
          </View>
        </Pressable>
        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          {data.length === 0 && <HomeSkeleton />}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}>
            {data.length > 0 &&
              data.map((item: TrackProps, index: number) => (
                <View key={index}>
                  <MusicCard
                    onPress={() => {
                      goToMusicDesc(item);
                    }}
                    {...{item}}
                  />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default MeditationHome;

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
