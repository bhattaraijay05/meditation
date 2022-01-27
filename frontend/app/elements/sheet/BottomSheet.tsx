import useStyle from '@hooks/useStyle';
import React, { useEffect } from 'react';
import { BackHandler, Dimensions, View, ViewProps } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const springConfig = {
  damping: 500,
  mass: 0.2,
  stiffness: 300,
  overshootClamping: true,
  restSpeedThreshold: 0.3,
  restDisplacementThreshold: 0.3,
  deceleration: 0.999,
  bouncyFactor: 1,
  toss: 0.4,
  coefForTranslatingVelocities: 5,
  velocity: 0.1,
};

interface BottomSheetProps {
  show?: boolean;
  component: any;
  style?: ViewProps;
  showTop?: boolean;
  snapPoint?: number;
  setShowSheet: (show: boolean) => void;
  bgcolor?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  show = false,
  style,
  component,
  showTop = true,
  snapPoint = 0.5,
  setShowSheet,
  bgcolor,
}) => {
  const { color } = useStyle()
  const hiddenHeight = height * 1.3;
  const heightSnap = height * (1 - snapPoint);
  const top = useSharedValue(hiddenHeight);
  const bgHeight = useSharedValue(0);
  const sheetStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, springConfig),
    };
  });

  useEffect(() => {
    if (show === true) {
      top.value = heightSnap;
      bgHeight.value = hiddenHeight;
    } else {
      top.value = hiddenHeight;
      bgHeight.value = 0;
    }
  }, [show]);

  useEffect(() => {
    const backAction = () => {
      if (show === true) {
        setShowSheet(false);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [show]);

  const panEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_, ctx) => {
      ctx.y = top.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY > 0) {
        top.value = event.translationY + ctx.y;
      }
    },
    onEnd: () => {
      if (top.value > heightSnap + 100) {
        top.value = hiddenHeight;
        bgHeight.value = 0;
        runOnJS(setShowSheet)(false);
      } else {
        top.value = heightSnap;
      }
    },
  });

  const tapGestureEvent = () => {
    top.value = hiddenHeight;
    bgHeight.value = 0;
    runOnJS(setShowSheet)(false);
  };

  const bgStyle = useAnimatedStyle(() => {
    return {
      height: bgHeight.value,
      backgroundColor: withSpring(
        bgcolor ? bgcolor + '60' : '#00000080',
        springConfig,
      ),
    };
  });

  return (
    <>
      <TapGestureHandler onHandlerStateChange={tapGestureEvent}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
            },
            bgStyle,
          ]}
        />
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={panEvent}>
        <Animated.View
          style={[
            {
              backgroundColor: bgcolor,
              bottom: 0,
              left: 0,
              right: 0,
              position: 'absolute',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              zIndex: 1000,
            },
            sheetStyle,
            style,
          ]}>
          {showTop && (
            <View
              style={{
                width: 25,
                height: 5,
                backgroundColor: color.textColor,
                borderRadius: 5,
                alignSelf: 'center',
                marginVertical: 10,
              }}
            />
          )}
          {component}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default BottomSheet;
