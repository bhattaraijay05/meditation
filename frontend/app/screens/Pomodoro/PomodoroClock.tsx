import {WIDTH} from '@constants/const';
import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import MaskedView from '@react-native-masked-view/masked-view';
import {secondsToHHMMSS} from '@utils/secondsToHHMMSS';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const APPLEWIDTH = 260;

const PomodoroClock = () => {
  const totalTime = 15;
  const [timer, setNum] = useState(totalTime);
  const [pause, setPause] = useState(true);
  const {color} = useStyle();

  //@ts-ignore
  const intervalRef = useRef<NodeJS.Timeout>(timer);

  const decreaseNum = () => {
    setNum(prev => prev - 1);
  };

  useEffect(() => {
    if (!pause && timer > 0) {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    if (timer < 1) {
      setNum(totalTime);
    }
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 1000);
    }
    setPause(prev => !prev);
  };

  const elapsed = 1 - timer / totalTime;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      flex: withSpring(elapsed) || 1,
    };
  });

  return (
    <SafeView
      style={{
        padding: 20,
      }}>
      <MyText center>Pomodoro Clock</MyText>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <MyText fontSize={30}>Timer</MyText>
        <MyText fontSize={30}>{secondsToHHMMSS(timer)}</MyText>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: APPLEWIDTH,
          height: 270,
          alignSelf: 'center',
          marginTop: 80,
        }}>
        <MaskedView
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            width: APPLEWIDTH,
            backgroundColor: color.inverse,
            height: '100%',
          }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="apple-alt" size={APPLEWIDTH} color={'#000'} />
            </View>
          }>
          <AnimatedLinearGradient
            colors={['#91000C', '#91000C', '#C4000E', '#C4000E', '#91000C']}
            style={[
              {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              },
              animatedStyles,
            ]}>
            {elapsed > 0.95 && (
              <MyText title style={{marginTop: 25}}>
                Hello
              </MyText>
            )}
          </AnimatedLinearGradient>
        </MaskedView>
      </View>

      <Pressable
        style={{
          backgroundColor: '#324376',
          width: WIDTH * 0.5,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginTop: 20,
          alignSelf: 'center',
        }}
        onPress={handleClick}>
        <MyText color={'#fff'}>{pause ? 'Run' : 'Pause'}</MyText>
      </Pressable>
    </SafeView>
  );
};

export default PomodoroClock;

const styles = StyleSheet.create({});
