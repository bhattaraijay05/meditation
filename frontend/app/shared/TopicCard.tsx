import {TopicsProps} from '@constants/Interfaces';
import {MyText} from '@elements/SharedElements';
import React, {useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');

interface TopicCardProps {
  topic: TopicsProps;
  setCategories: any;
  categories: any;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  setCategories,
  categories,
}) => {
  const [selected, setSelected] = useState(false);

  const itemSelected = () => {
    if (selected === false) {
      setSelected(true);
      setCategories(categories.concat(topic.category));
    } else if (selected === true) {
      setSelected(false);
      setCategories(
        categories.filter(
          (d: TopicCardProps) => d.categories !== topic.category,
        ),
      );
    }
  };
  return (
    <React.Fragment>
      <Pressable
        style={{
          ...styles.topicView,
          backgroundColor: topic.backgroundColor,
          height: height / 3.5,
        }}
        onPress={() => {
          itemSelected();
        }}>
        {selected && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#00000050',
              zIndex: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="checkcircle" size={55} color={'#0f0'} />
          </View>
        )}
        <MyText
          style={{
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            color: topic.texture === 'dark' ? '#fff' : '#000',
          }}>
          {topic.title}
        </MyText>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={topic.image}
            style={{
              resizeMode: 'contain',
              maxWidth: width / 2.3,
            }}
          />
        </View>
      </Pressable>
    </React.Fragment>
  );
};

export default TopicCard;

const styles = StyleSheet.create({
  topicView: {
    paddingVertical: '5%',
    margin: '2%',
    borderRadius: 18,
    width: width / 2.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: '25%',
    paddingVertical: '5%',
  },
});
