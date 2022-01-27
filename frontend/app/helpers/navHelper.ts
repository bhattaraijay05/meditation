import {offlineTrackProps, TrackProps} from '@constants/Interfaces';
import {MainStackRoutes} from '@constants/screens';
import {useNavigation} from '@react-navigation/core';

const useNavHelper = () => {
  const navigation = useNavigation<any>();
  const handleBack = () => {
    navigation.goBack();
  };

  const goToMusicPage = (item: TrackProps) => {
    navigation.navigate(MainStackRoutes.MainMusicPage, {
      item: item,
    });
  };

  const goToDownloadedList = () => {
    navigation.navigate(MainStackRoutes.MainDownloadedMusicListPage);
  };

  const goToMusicDesc = (item: TrackProps) => {
    navigation.navigate(MainStackRoutes.MusicDescription, {item: item});
  };

  const goToOfflineMusic = (item: offlineTrackProps) => {
    navigation.navigate(MainStackRoutes.MainDownloadedMusicPage, {
      path: item.path,
      name: item.name.substring(8),
      merge: true,
    });
  };

  const goToTrackUpload = () => {
    navigation.navigate(MainStackRoutes.TrackUpload);
  };

  return {
    handleBack,
    goToMusicPage,
    goToDownloadedList,
    goToMusicDesc,
    goToOfflineMusic,
    goToTrackUpload,
  };
};

export default useNavHelper;
