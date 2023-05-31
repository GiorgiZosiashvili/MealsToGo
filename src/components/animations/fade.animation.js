import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
export const FadeInView = ({ duration = 1500, children, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
