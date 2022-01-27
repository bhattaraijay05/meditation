import {ImageSourcePropType} from 'react-native';

export interface TrackProps {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
  album: string;
  duration: number;
  image: ImageSourcePropType;
  category: string;
  type: string;
}

export interface CategoryProps {
  title: string;
  icon: string;
  category: string;
}

export interface offlineTrackProps {
  name: string;
  path: string;
}

export interface TopicsProps {
  title: string;
  backgroundColor: string;
  image: ImageSourcePropType;
  texture: string;
  category: string;
}
