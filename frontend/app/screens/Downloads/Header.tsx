import {MyText} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BackIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: React.FC = () => {
  const {color} = useStyle();
  const {handleBack} = useNavHelper();
  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={handleBack}
        style={{...styles.cross, backgroundColor: color.inverse + '40'}}>
        <BackIcon name="keyboard-backspace" size={30} color={color.textColor} />
      </Pressable>
      <View style={styles.icons}>
        <MyText title fontWeight="700">
          Downloads
        </MyText>
      </View>
      <View />
      <View />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  cross: {
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
