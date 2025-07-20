import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText} from './CustomDesign';
import Activetick from '../assets/svg/activetick.svg';
import Disabletick from '../assets/svg/disabletick.svg';
import {COLORS} from '../constants';
import {useFont} from '../constants/theme';
import strings from '../constants/strings';
import {Text, TextInput} from 'react-native-paper';

export const TimeLineView = ({item, index, onPress}) => {
  let getcolors;
  let showimage;
  let linecolor;
  if (item.location === null || item.location === '') {
    getcolors = COLORS.grey_B8;
    showimage = false;
  } else {
    getcolors = COLORS.black_1A;
    showimage = true;
  }

  if (index === 3) {
    linecolor = COLORS.white;
  } else {
    linecolor = COLORS.blue_C6;
  }

  if (index === 2 && item.location !== '') {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          {showimage ? (
            <Activetick width={35} height={35}></Activetick>
          ) : (
            <Disabletick width={35} height={35}></Disabletick>
          )}

          <View
            style={{
              backgroundColor: COLORS.blue_C6,
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
            marginBottom: 50,
          }}>
          <CustomText
            inputText={item.status}
            textsize={16}
            textcolor={getcolors}
            setfontFamily={useFont.roboto_medium}></CustomText>
          <CustomText
            inputText={item.location}
            textsize={12}
            textcolor={COLORS.black_1A}
            setfontFamily={useFont.roboto_medium}></CustomText>
          <CustomText
            inputText={item.date}
            textsize={18}
            textcolor={COLORS.grey_78}
            setfontFamily={useFont.roboto_regular}></CustomText>

          <TouchableOpacity onPress={() => onPress(item)}>
            <Text
              style={[
                {
                  color: COLORS.blue_C6,
                  fontSize: 18,
                  fontWeight: '400',
                  alignSelf: 'flex-start',
                },
                {color: COLORS.blue_C6, textDecorationLine: 'underline'},
              ]}>
              {strings.see_all}
            </Text>
            {/* <CustomText
              inputText={strings.see_all}
              textsize={18}
              textcolor={COLORS.blue_C6}
              setfontFamily={useFont.roboto_regular}></CustomText> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column'}}>
          {showimage ? (
            <Activetick width={35} height={35}></Activetick>
          ) : (
            <Disabletick width={35} height={35}></Disabletick>
          )}
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
            marginBottom: 50,
          }}>
          <CustomText
            inputText={item.status}
            textsize={16}
            textcolor={getcolors}
            setfontFamily={useFont.roboto_medium}></CustomText>
          <CustomText
            inputText={item.location}
            textsize={12}
            textcolor={COLORS.black_1A}
            setfontFamily={useFont.roboto_medium}></CustomText>
          <CustomText
            inputText={item.date}
            textsize={18}
            textcolor={COLORS.grey_78}
            setfontFamily={useFont.roboto_regular}></CustomText>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
  },
});
