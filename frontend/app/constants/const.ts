import {Dimensions} from 'react-native';

export const LIGHT = 'light';
export const DARK = 'dark';
const {width, height} = Dimensions.get('window');

export const WIDTH = width;
export const HEIGHT = height;

export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export interface DAYSPROPS {
  Sunday: string;
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
}
