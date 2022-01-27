import {AudioDirectoryPath} from '@constants/saveconst';
import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

const useData = () => {
  const [downloadedMusic, setDownloadedMusic] = useState<any>([]);
  useEffect(() => {
    const read = RNFS.readDir(AudioDirectoryPath)
      .then(files => {
        return setDownloadedMusic(files);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
    return () => {
      read;
      downloadedMusic;
    };
  }, [downloadedMusic]);

  return {downloadedMusic};
};

export default useData;
