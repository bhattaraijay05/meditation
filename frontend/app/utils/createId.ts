import {customAlphabet} from 'nanoid';
import 'react-native-get-random-values';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  8,
);

export const createId = () => {
  return nanoid();
};
