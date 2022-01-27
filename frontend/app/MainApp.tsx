import {HEIGHT} from '@constants/const';
import {AuthContext} from '@context/AuthContextProvider';
import {MyText} from '@elements/SharedElements';
import useNavHelper from '@helpers/navHelper';
import {useNetInfo} from '@react-native-community/netinfo';
import Remainder from '@screens/Welcome/Remainder';
import React, {useContext, useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import MainStack from './navigations/MainStack';

const MainApp = () => {
  const {authState} = useContext(AuthContext);
  const {goToDownloadedList} = useNavHelper();
  const [show, setShow] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isConnected) {
      setShow(false);
    } else {
      setShow(true);
    }
    return () => {
      setShow(false);
    };
  }, [netInfo]);

  return (
    <>
      {authState.userToken === null ? (
        <Remainder />
      ) : (
        <>
          <MainStack />
          {show && (
            <>
              <Pressable
                onPress={() => {
                  setShow(false);
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#00000080',
                  ...StyleSheet.absoluteFillObject,
                  height: '100%',
                }}>
                <Pressable
                  style={{
                    backgroundColor: 'red',
                    padding: 20,
                    marginHorizontal: 50,
                    borderRadius: 50,
                    bottom: -HEIGHT / 1.2,
                  }}
                  onPress={() => {
                    goToDownloadedList();
                    setShow(false);
                  }}>
                  <MyText center color="#fff" fontSize={30}>
                    Go To Downloads
                  </MyText>
                </Pressable>
              </Pressable>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MainApp;
