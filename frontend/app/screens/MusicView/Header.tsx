import {TrackProps} from '@constants/Interfaces';
import {MyText} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import EnIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width} = Dimensions.get('window');
type HeaderProps = {
  backHandler: () => void;
  item: TrackProps;
  downloadData: () => void;
  downloaded?: boolean;
  downloadProgress: number;
};

const Header: React.FC<HeaderProps> = props => {
  const {backHandler, item, downloadData, downloaded, downloadProgress} = props;
  const {color} = useStyle();
  const handleBack = () => {
    backHandler();
  };

  return (
    <View style={[styles.headerContainer]}>
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
        {item.title}
      </MyText>

      <View style={styles.icons}>
        <Pressable style={{marginRight: 10, padding: 10, borderRadius: 30}}>
          <EnIcon name="heart-outlined" size={24} color={color.textColor} />
        </Pressable>

        {downloadProgress > 0 && downloadProgress < 0.9 ? (
          <View style={{marginRight: 10, padding: 10, borderRadius: 30}}>
            {Platform.OS === 'android' ? (
              <Progress.Pie progress={downloadProgress} size={26} />
            ) : (
              <ActivityIndicator size="small" color="#f00" />
            )}
          </View>
        ) : (
          <>
            {downloaded ? (
              <Pressable
                style={{marginRight: 10, padding: 10, borderRadius: 30}}>
                <Icon
                  name="file-download-done"
                  size={26}
                  color={color.downloadedColor}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={downloadData}
                style={{marginRight: 10, padding: 10, borderRadius: 30}}>
                <Icon name="file-download" size={24} color={color.textColor} />
              </Pressable>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Header;

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
