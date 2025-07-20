import React from 'react';
import { StatusBar } from 'react-native';
import { COLORS } from '../constants/theme';
export const CustomStatusBar = () => {
  return <StatusBar backgroundColor={COLORS.backgroundColor} barStyle="dark-content" />;
};

