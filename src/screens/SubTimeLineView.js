import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomText} from './CustomDesign';
import Activetick from '../assets/svg/activetick.svg';
import {COLORS} from '../constants';
import {useFont} from '../constants/theme';

export const SubTimeLineView = ({item, index, indexlength}) => {
  let linecolor;
  if (index + 1 === indexlength) {
    linecolor = COLORS.white;
  } else {
    linecolor = COLORS.blue_C6;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
        <Activetick width={35} height={35}></Activetick>
        <View
          style={{
            backgroundColor: linecolor,
            flexGrow: 1,
            width: 2,
            marginStart: 15,
          }}></View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginStart: 15,
          flex: 1,
          marginBottom: 20,
        }}>
        <CustomText
          inputText={item.status}
          textsize={16}
          textcolor={COLORS.black_1A}
          setfontFamily={useFont.roboto_medium}></CustomText>
        <CustomText
          inputText={item.location + ' | ' + item.date}
          textsize={12}
          textcolor={COLORS.black_1A}
          setfontFamily={useFont.roboto_medium}></CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
  },
});
