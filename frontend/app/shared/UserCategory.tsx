import {categories} from '@constants/categories';
import {CategoryProps} from '@constants/Interfaces';
import {MyText} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type UseCategoryProps = {
  itemSelected: any;
  selected: any;
};

const UserCategory: React.FC<UseCategoryProps> = ({itemSelected, selected}) => {
  const {color} = useStyle();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category: CategoryProps, index: number) => {
        return (
          <Pressable
            onPress={() => {
              itemSelected(category);
            }}
            key={index}
            style={{marginHorizontal: 20}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
                backgroundColor:
                  selected === category ? color.iconColor : color.grey + '80',
              }}>
              <Icon
                name={category.icon}
                color={selected === category ? '#fff' : color.inverse + '80'}
                size={25}
              />
            </View>
            <MyText
              fontSize={15}
              center
              color={selected === category ? color.iconColor : color.textColor}>
              {category.title}
            </MyText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default UserCategory;

const styles = StyleSheet.create({});
