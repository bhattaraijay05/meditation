import {TopicsProps, TrackProps} from '@constants/Interfaces';
import {SafeView} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import {tracks} from '@screens/MusicView/tracks';
import BackHeader from '@shared/BackHeader';
import MusicCard from '@shared/MusicCard';
import {HomeSkeleton} from '@shared/Skeletons';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const TopicMusic = (props: any) => {
  const {item}: {item: TopicsProps} = props.route.params;
  const [data, setData] = useState([]);
  const {goToMusicPage} = useNavHelper();

  useEffect(() => {
    setTimeout(() => {
      setData(
        tracks.filter((track: TrackProps) =>
          track.type.includes(item.category),
        ),
      );
    }, 200);
    return () => {
      setData([]);
    };
  }, []);

  return (
    <SafeView>
      <ScrollView>
        <BackHeader title={item.title} />

        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          {data.length === 0 && <HomeSkeleton />}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {data.length > 0 &&
              data.map((item: TrackProps, index: number) => (
                <View key={index}>
                  <MusicCard onPress={() => goToMusicPage(item)} {...{item}} />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default TopicMusic;

const styles = StyleSheet.create({});
