import {TopicsProps} from '@constants/Interfaces';
import {HomeStackRoutes} from '@constants/screens';
import {ThemeContext} from '@context/ThemeContext';
import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import {useNavigation} from '@react-navigation/core';
import {topics} from '@screens/TopicChoose/topics';
import CategoryCard from '@shared/CategoryCard';
import HomeCard from '@shared/HomeCard';
import {HomeSkeleton, HorizontalSkeleton} from '@shared/Skeletons';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = () => {
  const {color} = useStyle();
  const {toggleTheme} = useContext(ThemeContext);
  const [data, setData] = useState<any>([]);
  const [time, setTime] = useState('');
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(topics);
    }, 2000);
    return () => {
      setData([]);
    };
  }, []);

  useEffect(() => {
    // set the time according to the current time
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) {
      setTime('Morning');
    } else if (currentTime >= 12 && currentTime < 18) {
      setTime('Afternoon');
    } else {
      setTime('Night');
    }
  }, [time]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    wait(1000).then(() => {
      setRefreshing(false);
      setData(topics);
    });
  }, []);

  const goToTopicMusic = (item: TopicsProps) => {
    navigation.navigate(HomeStackRoutes.TopicMusic, {item: item});
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
        <MyText center style={{marginVertical: 10}}>
          Home
        </MyText>
        <View style={{marginVertical: 20, paddingHorizontal: 10}}>
          <MyText bold title>
            Good {time} User
          </MyText>
          <MyText color={color.grey}>We wish you a good day</MyText>
        </View>
        <View>
          {data.length <= 0 && <HorizontalSkeleton />}
          {data.length > 0 && (
            <FlatList
              data={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <CategoryCard
                    item={item}
                    onPress={() => goToTopicMusic(item)}
                  />
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* <MyButton
          onPress={() => {
            navigation.navigate(HomeStackRoutes.HomeMusic);
          }}>
          Music
        </MyButton> */}
        <Pressable onPress={toggleTheme}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.dailyCarousel}>
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
                  padding: 5,
                },
              ]}>
              <Icon name="play-arrow" size={35} color={color.inverse} />
            </View>
          </LinearGradient>
        </Pressable>
        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          <MyText fontSize={30}>Recommended For You</MyText>

          {data.length <= 0 && <HomeSkeleton />}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}>
            {data.length > 0 &&
              data.map((item: TopicsProps, index: number) => (
                <View key={index}>
                  <HomeCard
                    onPress={() => {
                      console.log(item);
                    }}
                    item={item}
                  />
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default Home;

const styles = StyleSheet.create({
  dailyCarousel: {
    height: 90,
    backgroundColor: '#000',
    alignSelf: 'center',
    width: width * 0.95,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
});
