import colors from '@constants/colors';
import {MyText} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import EnIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HeaderProps = {
  backHandler: () => void;
  name: string;
  deletefromOffline: () => void;
};

const OfflineMusicHeader: React.FC<HeaderProps> = props => {
  const {backHandler, name, deletefromOffline} = props;
  const {color} = useStyle();
  const handleBack = () => {
    backHandler();
  };

  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={handleBack}
        style={{...styles.cross, backgroundColor: color.inverse}}>
        <EnIcon name="cross" size={30} color={color.main} />
      </Pressable>

      <MyText
        ellipsizeMode="tail"
        numberOfLines={1}
        style={{
          flex: 1,
        }}>
        {name}
      </MyText>

      <View style={styles.icons}>
        <Pressable style={{marginRight: 10, padding: 10, borderRadius: 30}}>
          <EnIcon name="heart-outlined" size={24} color={color.textColor} />
        </Pressable>

        <Pressable
          style={{marginRight: 10, padding: 10, borderRadius: 30}}
          onPress={deletefromOffline}>
          <Icon name="delete-outline" size={26} color={colors.deletedColor} />
        </Pressable>
      </View>
    </View>
  );
};

export default OfflineMusicHeader;

const styles = StyleSheet.create({
  cross: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
