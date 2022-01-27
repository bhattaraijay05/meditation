import useNavHelper from '@helpers/navHelper';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MusicHeaderProps {
  image?: ImageSourcePropType;
}

const MusicHeader: React.FC<MusicHeaderProps> = ({image}) => {
  const {color} = useStyle();
  const {handleBack} = useNavHelper();
  return (
    <>
      <ImageBackground
        source={
          typeof image === 'string'
            ? {uri: image}
            : require('@assets/images/bg.png')
        }
        style={{
          height: 250,
          width: '100%',
        }}>
        <Pressable
          onPress={handleBack}
          style={{...styles.cross, backgroundColor: color.inverse + '40'}}>
          <BackIcon name="keyboard-backspace" size={30} color={color.white} />
        </Pressable>
      </ImageBackground>
    </>
  );
};

export default MusicHeader;

const styles = StyleSheet.create({
  cross: {
    padding: 8,
    borderRadius: 10,
    margin: 20,
    width: 48,
  },
});
