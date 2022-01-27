import {TopicsProps} from '@constants/Interfaces';
import {MyText} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {Dimensions, Image, Pressable, View} from 'react-native';
const {width} = Dimensions.get('window');

interface HomeCardProps {
  onPress: () => void;
  item: TopicsProps;
}

const HomeCard: React.FC<HomeCardProps> = ({item, onPress}) => {
  const {color} = useStyle();
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: item.backgroundColor,
          width: width / 2.2,
          height: width / 3.2,
          marginTop: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          style={{
            resizeMode: 'contain',
            maxHeight: width / 3.5,
          }}
        />
      </Pressable>
      <View>
        <MyText
          bold
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            width: width / 2.2,
          }}>
          {item.title}
        </MyText>
        <MyText
          fontSize={14}
          color={color.grey}
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            width: width / 2.2,
          }}>
          {item.title}
        </MyText>
      </View>
    </>
  );
};

export default HomeCard;
