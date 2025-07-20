import React from 'react';
import {Appbar} from 'react-native-paper';
import {COLORS, SIZES, useFont} from '../constants/theme';

export const CustomToolbar = ({toolText,navigation}) => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: COLORS.backgroundColor,
        paddingVertical: 10,
        margin: 0,
        padding: 0,
      }}>
      <Appbar.BackAction onPress={() => {navigation.goBack()}} />
      <Appbar.Content
        titleStyle={{
          color: COLORS.black_1A,
          fontSize: SIZES.SIZE_21,
          fontFamily: useFont.roboto_bold,
        }}
        title={toolText}
      />
    </Appbar.Header>
  );
};
