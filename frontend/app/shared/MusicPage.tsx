import {useMutation, useQuery} from '@apollo/client';
import {TrackTypeData} from '@constants/graphQLInterface';
import {TrackProps} from '@constants/Interfaces';
import {MainStackRoutes} from '@constants/screens';
import {MyText, SafeView} from '@elements/SharedElements';
import {DELETE_TRACK} from '@graphql/mutation';
import {FETCH_ALL_TRACKS} from '@graphql/queries';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import {useNavigation} from '@react-navigation/core';
import MusicCard from '@shared/MusicCard';
import MusicHeader from '@shared/MusicHeader';
import React, {useEffect, useState} from 'react';
import {Alert, Pressable, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const MusicPage = (props: any) => {
  const {item}: {item: TrackProps} = props.route.params;
  const {color} = useStyle();
  const navigation = useNavigation<any>();
  const {goToMusicDesc, goToMusicPage, handleBack} = useNavHelper();
  const [data, setData] = useState<TrackProps[]>([]);

  const {data: datas, refetch} = useQuery<TrackTypeData, TrackProps>(
    FETCH_ALL_TRACKS,
  );
  const [removeTrack, {error}] = useMutation(DELETE_TRACK);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (datas) {
      setData(datas.tracks);
    }
  }, [datas]);

  const handleDelete = async (id: string) => {
    setUploading(true);
    removeTrack({
      variables: {
        id: id,
      },
    });
    setTimeout(() => {
      setUploading(false);
      refetch();
      handleBack();
    }, 1000);
  };

  if (uploading)
    return (
      // <LottieView source={require('@assets/lottie/update.json')} autoPlay />

      <MyText>Updating</MyText>
    );

  if (error) return <MyText>{error.message}</MyText>;

  const deleteMusic = () => {
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
            handleDelete(item.id);
          },
        },
      ],
      {cancelable: true},
    );
  };

  const editMusic = () => {
    navigation.navigate(MainStackRoutes.TrackUpdate, {id: item.id});
  };

  return (
    <SafeView>
      <ScrollView>
        <MusicHeader image={require('@assets/images/trackimages/a.png')} />
        <View style={{paddingHorizontal: 10, marginTop: 20}}>
          <MyText fontSize={35}>{item.title}</MyText>
          <MyText>3 min : Sleep Music</MyText>

          <MyText fontSize={14} style={{marginVertical: 10}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel dolore
            deserunt sequi excepturi, minus id atque numquam cupiditate
            consequuntur assumenda?
          </MyText>

          <Pressable
            style={{
              backgroundColor: color.grey,
              paddingHorizontal: 20,
              margin: 10,
              borderRadius: 30,
              paddingVertical: 10,
            }}
            onPress={() => goToMusicPage(item)}>
            <MyText center title color={color.white}>
              Play Music
            </MyText>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: color.grey,
              paddingHorizontal: 20,
              margin: 10,
              borderRadius: 30,
              paddingVertical: 10,
            }}
            onPress={deleteMusic}>
            <MyText center title color={color.white}>
              Delete Music
            </MyText>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: color.grey,
              paddingHorizontal: 20,
              margin: 10,
              borderRadius: 30,
              paddingVertical: 10,
            }}
            onPress={editMusic}>
            <MyText center title color={color.white}>
              Edit Music
            </MyText>
          </Pressable>

          <MyText fontSize={30}>Related</MyText>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {data
                .filter(
                  (track: TrackProps) =>
                    track.id !== item.id && track.category === item.category,
                )
                .map((item: TrackProps, index: number) => (
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
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default MusicPage;
