import React from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStyle from '../hooks/useStyle';
import {Container} from './Styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CustomViewProps = {
  style?: ViewStyle | ViewStyle[];
};

type ContextType = {
  x: number;
  y: number;
};

const DragableView: React.FC<CustomViewProps> = ({children, style}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
    },
    onEnd: () => {
      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });
  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  }, [x, y]);

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          panStyle,
          style,
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const SafeView: React.FC<CustomViewProps> = ({children, style}) => {
  const {color} = useStyle();

  // const bgColor = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: withSpring(color.main),
  //   };
  // });

  return (
    <Animated.View
      style={[Container.flexContainer, style, {backgroundColor: color.main}]}>
      {/* <SafeAreaView> */}
      {children}
      {/* </SafeAreaView> */}
    </Animated.View>
  );
};

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  color?: string;
  fontSize?: number;
  title?: boolean;
  fontFamily?: string;
  center?: boolean;
  bold?: boolean;
  textAlign?: any;
  fontWeight?: any;
  numberOfLines?: number;
}

const MyText: React.FC<CustomTextProps> = ({
  children,
  title,
  fontSize,
  style,
  center,
  textAlign,
  bold,
  fontWeight,
  color: textColor,
  numberOfLines,
}) => {
  const {color} = useStyle();
  return (
    <Text
      numberOfLines={numberOfLines && numberOfLines}
      style={[
        {
          color: textColor ? textColor : color.textColor,
          fontSize: fontSize ? fontSize : title ? 32 : 17,
          textAlign: center ? 'center' : textAlign,
          fontWeight: bold ? 'bold' : fontWeight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

interface CustomPressableProps extends PressableProps {
  style?: any;
  color?: string;
  fontSize?: number;
  title?: boolean;
  fontFamily?: string;
  bold?: boolean;
  textAlign?: any;
  fontWeight?: any;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  width?: number;
  rounded?: boolean;
}

const MyButton: React.FC<CustomPressableProps> = ({
  children,
  title,
  fontSize,
  style,
  fontFamily,
  textAlign = 'center',
  bold,
  fontWeight,
  padding = 10,
  borderRadius = 5,
  width = 150,
  rounded,
  color,
  ...props
}) => {
  return (
    <AnimatedPressable
      {...props}
      style={{
        borderRadius: rounded ? width / 4 : borderRadius,
        padding,
      }}>
      <MyText
        color={color}
        style={[
          {
            fontSize: fontSize ? fontSize : title ? 32 : 18,
            textAlign: textAlign,
            fontWeight: bold ? 'bold' : fontWeight,
            width,
          },
          {
            ...style,
          },
        ]}>
        {children}
      </MyText>
    </AnimatedPressable>
  );
};

export {DragableView, SafeView, MyText, MyButton};
