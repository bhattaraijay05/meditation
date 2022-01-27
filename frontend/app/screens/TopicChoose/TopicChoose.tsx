import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import TopicCard from '@shared/TopicCard';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {topics} from './topics';

const TopicChoose = () => {
  const {color} = useStyle();
  const [categories, setCategories] = useState<any>([]);

  const done = () => {
    console.log(categories);
  };

  return (
    <SafeView>
      <ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
            padding: '5%',
            flexDirection: 'row',
          }}>
          <MyText color={color.grey}>Choose a topic to focus on</MyText>
          <Pressable onPress={done}>
            <MyText fontSize={24}>Done</MyText>
          </Pressable>
        </View>

        <View style={{...styles.container}}>
          {topics.map((topic, index) => {
            return (
              <TopicCard
                key={index}
                {...{topic}}
                {...{setCategories}}
                {...{categories}}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default TopicChoose;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginBottom: '25%',
    paddingVertical: '5%',
  },
});
