import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

export const AppFolder = 'Meditation App';
const AppFolderPath =
  Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.ExternalDirectoryPath;

export const DirectoryPath = AppFolderPath + '/' + AppFolder;

export const AudioDirectoryPath = AppFolderPath + '/' + AppFolder + '/audio';

export const filePath = DirectoryPath + '/' + 'alldownloadedMusic' + '.json';
