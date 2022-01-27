import React, {createContext} from 'react';
import {useSharedValue} from 'react-native-reanimated';

export const BottomTabContext = createContext<any>({
  tabHeight: 55,
});

const BottomTabContextProvider = (props: any) => {
  const tabHeight = useSharedValue(60);

  return (
    <BottomTabContext.Provider value={{tabHeight: tabHeight}}>
      {props.children}
    </BottomTabContext.Provider>
  );
};
export default BottomTabContextProvider;
