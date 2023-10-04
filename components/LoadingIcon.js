import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useTheme } from "react-native-paper";

const BouncingBall = ({
  styles,
  startingValue = 0,
  size,
  reverseAnim,
  duration = 500,
}) => {
  const bouncingAnim = useRef(new Animated.Value(startingValue)).current;
  const animSize = size || styles.width || styles.height || 20;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bouncingAnim, {
          toValue: reverseAnim ? 0 : 1,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(bouncingAnim, {
          toValue: reverseAnim ? 1 : 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bouncingAnim]);

  return (
    <Animated.View
      style={{
        borderRadius: 100,
        ...styles,
        width: animSize,
        height: animSize,
        transform: [
          {
            translateY: bouncingAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-animSize * 0.75, animSize * 0.75],
            }),
          },
        ],
      }}
    />
  );
};

const WrapperView = ({ children, fullSize, styles }) => {
  if (fullSize) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: " 100%",
          ...styles,
        }}
      >
        {children}
      </View>
    );
  } else {
    return (
      <View
        style={{ alignItems: "center", justifyContent: "center", ...styles }}
      >
        {children}
      </View>
    );
  }
};

export const LoadingIcon = ({ size, loadingText, fullSize, styles = {} }) => {
  const theme = useTheme();
  const duration = 400;

  return (
    <WrapperView fullSize={fullSize} styles={styles}>
      <BouncingBall
        startingValue={0}
        duration={duration}
        size={size}
        styles={{
          backgroundColor: theme.colors.primary,
          marginLeft: 2,
        }}
      />
      <BouncingBall
        startingValue={1}
        duration={duration}
        reverseAnim={true}
        size={size}
        styles={{
          background: "transparent",
          borderColor: theme.colors.primary,
          borderWidth: 2,
        }}
      />
      {loadingText && (
        <Animated.Text style={{ marginTop: size }}>{loadingText}</Animated.Text>
      )}
    </WrapperView>
  );
};
