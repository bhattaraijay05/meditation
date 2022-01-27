import RNFS from 'react-native-fs';

export const AppFolder = 'Meditation App';

export const DirectoryPath = RNFS.ExternalDirectoryPath + '/' + AppFolder;

export const AudioDirectoryPath =
  RNFS.ExternalDirectoryPath + '/' + AppFolder + '/audio';

export const filePath = DirectoryPath + '/' + 'alldownloadedMusic' + '.json';
