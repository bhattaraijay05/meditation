import {TopicsProps} from '@constants/Interfaces';
import {MyText} from '@elements/SharedElements';
import React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';

const {width, height} = Dimensions.get('window');

interface CategoryCardProps {
  item: TopicsProps;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({item, onPress}) => {
  const textColor = item.texture === 'dark' ? '#fff' : '#000';
  return (
    <Pressable
      style={{
        ...styles.topicView,
        backgroundColor: item.backgroundColor,
        height: height / 3.5,
      }}
      onPress={onPress}>
      <Image
        source={item.image}
        style={{
          width: 100,
          height: 100,
          alignSelf: 'flex-end',
          position: 'absolute',
          right: 10,
          top: 10,
        }}
      />
      <View style={{justifyContent: 'space-between', flex: 1, padding: 10}}>
        <View />
        <View>
          <MyText color={textColor} fontSize={22} style={{marginTop: 10}}>
            {item.title}
          </MyText>
          <MyText color={textColor}>Music</MyText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <MyText fontSize={14} color={textColor}>
            5-10 min
          </MyText>
          <MyText
            style={{
              backgroundColor: item.texture === 'dark' ? '#EBEAEC80' : 'white',
              padding: 10,
              fontSize: 22,
              color: textColor,
              borderRadius: 30,
              width: 80,
            }}
            center>
            Start
          </MyText>
        </View>
      </View>
    </Pressable>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  topicView: {
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
  },
});
