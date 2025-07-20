import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {CustomText} from './CustomDesign';
import Ecomlogo from '../assets/svg/logo.svg';
import Notification from '../assets/svg/notification.svg';
import {COLORS, useFont} from '../constants/theme';
export const HomePageToolbar = ({navigation}) => {
  return (
    <View style={style.container}>
      <View style={style.circularImage}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <CustomText
            inputText={'S'}
            textsize={24}
            textcolor={'white'}
            inputTextAlign={'center'}
            setfontFamily={useFont.roboto_medium}
          />
        </TouchableOpacity>
      </View>
      <Ecomlogo></Ecomlogo>
      <View style={style.hiddenElement}>
        <Notification></Notification>
      </View>
    </View>
  );
};

export const CustomProfileBar = () => {
  return (
    <View style={style.profilecontainer}>
      <View style={style.circularProfileImage}>
        <CustomText
          inputText={'S'}
          textsize={24}
          textcolor={'white'}
          inputTextAlign={'center'}
          setfontFamily={'Roboto_Medium'}
        />
      </View>
      <View
        style={{
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}>
        <CustomText
          inputText={'Sumit Singh'}
          textsize={21}
          textcolor={'#1A1A1A'}
          fontweighting={'700'}
        />
        <CustomText
          inputText={'9871240124'}
          textsize={21}
          textcolor={'#1A1A1A'}
          fontweighting={'700'}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  profilecontainer: {
    backgroundColor: '#F0F6FF',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  circularImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: COLORS.blue_C6,
    alignContent: 'center',
    justifyContent: 'center',
  },
  circularProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLORS.blue_C6,
    alignContent: 'center',
    justifyContent: 'center',
  },
  hiddenElement: {
    opacity: 0,
  },
});
