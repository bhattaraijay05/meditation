import {useQuery} from '@apollo/client';
import {categories} from '@constants/categories';
import {TrackTypeData} from '@constants/graphQLInterface';
import {CategoryProps, TrackProps} from '@constants/Interfaces';
import {MyText, SafeView} from '@elements/SharedElements';
import {FETCH_ALL_TRACKS} from '@graphql/queries';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
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

const Sleep = () => {
  const {data: datas, refetch} = useQuery<TrackTypeData, TrackProps>(
    FETCH_ALL_TRACKS,
  );
  const {color} = useStyle();
  const [selected, setSelected] = useState(categories[0]);
  const [data, setData] = useState<any>([]);
  const {goToMusicDesc, goToDownloadedList} = useNavHelper();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    refetch();
    if (datas) {
      setData(datas.tracks);
    }
  }, [datas]);

  const onRefresh = React.useCallback(() => {
    setData([]);
    refetch();
    setRefreshing(true);
    wait(100).then(() => {
      setRefreshing(false);
      if (datas) {
        setData(datas.tracks);
      }
    });
  }, [datas]);

  const fetchItem = (cat: string) => {
    setData([]);
    wait(100).then(() => {
      if (cat === 'all') {
        if (datas) {
          setData(datas.tracks);
        }
      } else {
        if (datas) {
          setData(
            datas.tracks.filter((track: TrackProps) =>
              track.category.includes(cat),
            ),
          );
        }
      }
    });
  };

  const itemSelected = (item: CategoryProps) => {
    setSelected(item);
    fetchItem(item.category);
  };

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
            Sleep Stories
          </MyText>
          <MyText color={color.grey} center fontSize={13}>
            Soothing bedtime stories to help you fall into a deep and natural
            sleep
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
          {data.length < 1 && <HomeSkeleton />}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {data.length > 0 &&
              data.map((item: TrackProps) => (
                <View key={item.id}>
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

export default Sleep;

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
