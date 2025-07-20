import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../constants';
import {SIZES, useFont} from '../constants/theme';

export const CustomText = ({
  inputText,
  textsize,
  fontstyling,
  textcolor,
  fontweighting,
  textTopMagin,
  textleftmargin,
  backrndclr,
  textpadding,
  backgrndcrnr,
  backgrndOpacity,
  inputTextAlign,
  textmarginBottom,
  setfontFamily,
  maxline,
}) => {
  return (
    <Text
      numberOfLines={maxline}
      style={{
        fontSize: textsize,
        fontStyle: fontstyling,
        color: textcolor,
        fontWeight: fontweighting,
        marginTop: textTopMagin,
        marginLeft: textleftmargin,
        backgroundColor: backrndclr,
        padding: textpadding,
        borderRadius: backgrndcrnr,
        opacity: backgrndOpacity,
        textAlign: inputTextAlign,
        marginBottom: textmarginBottom,
        fontFamily: setfontFamily,
      }}>
      {inputText}
    </Text>
  );
};

export const CustomView = ({showingText,textcolor,textsize}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 8,
        alignItems: 'center',
      }}>
      <CustomText
        inputText={showingText}
        textsize={textsize}
        textcolor={textcolor}
        setfontFamily={useFont.roboto_medium}></CustomText>
    </View>
  );
};
