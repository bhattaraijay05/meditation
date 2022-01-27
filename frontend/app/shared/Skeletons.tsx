import SkeletonPlaceholder from '@elements/Skeleton/Skeleton';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

const data = Array(6).fill(null);

const HorSk = () => {
  const {color} = useStyle();
  return (
    <SkeletonPlaceholder
      backgroundColor={color.inverse + '50'}
      highlightColor={color.main}>
      <View
        style={{
          paddingVertical: 10,
          margin: 10,
          borderRadius: 12,
          width: width / 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 4,
          height: height / 3.5,
        }}
      />
    </SkeletonPlaceholder>
  );
};

const Skeleton = () => {
  const {color} = useStyle();
  return (
    <SkeletonPlaceholder
      backgroundColor={color.inverse + '50'}
      highlightColor={color.main}>
      <SkeletonPlaceholder.Item
        width={width / 2.2}
        height={width / 3.2}
        marginTop={20}
        borderRadius={10}
      />
      <SkeletonPlaceholder.Item
        width={width / 2.2}
        height={20}
        marginTop={20}
        borderRadius={10}
      />
    </SkeletonPlaceholder>
  );
};

export const HorizontalSkeleton = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => {
        return <HorSk />;
      }}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export const HomeSkeleton = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
      }}>
      {data.map((_, index) => {
        return <Skeleton key={index} />;
      })}
    </View>
  );
};
