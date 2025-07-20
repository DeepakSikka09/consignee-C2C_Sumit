import React from 'react';
import { Button, Text } from 'react-native-paper';
import { COLORS } from '../constants';
import { useFont } from '../constants/theme';

export const CustomButton = ({ btnTitle, isEnable, onPress }) => {
  return (
    <Button
      style={{
        backgroundColor: isEnable ? COLORS.blue_8F : COLORS.grey_B8,
        borderRadius: 6,
      }}
      textColor={COLORS.white}
      labelStyle={{ fontSize: 21 }}
      disabled={!isEnable}
      onPress={onPress}>
      <Text
        style={{
          paddingVertical: 12,
          color: COLORS.white,
          fontFamily: useFont.roboto_medium,
        }}>
        {btnTitle}
      </Text>
    </Button>
  );
};
