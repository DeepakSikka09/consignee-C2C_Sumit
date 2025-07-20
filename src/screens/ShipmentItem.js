import React from 'react';
import {Card, Text, TextInput} from 'react-native-paper';
import ShirtSvg from '../assets/svg/shirt.svg';
import {COLORS} from '../constants';
import {useFont} from '../constants/theme';
import {Image} from 'react-native';

const {View, TouchableOpacity} = require('react-native');
const {CustomText} = require('./CustomDesign');

export const ShipmentItem = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 8,
            marginHorizontal: 20,
            marginVertical: 5,
          }}>
          <View style={{flexDirection: 'column'}}>
            {item.img ? (
              <Image
                source={{uri: item.img}}
                style={{flexGrow: 1, width: 100, height: 100, marginRight: 15}}
              />
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              paddingTop: 8,
            }}>
            <CustomText
              inputText={'AWB #' + item.awb}
              textsize={20}
              textcolor={COLORS.black_1A}
              setfontFamily={useFont.roboto_medium}
            />
            <CustomText
              maxline={2}
              inputText={item.name}
              textsize={14}
              textcolor={COLORS.black_1A}
              setfontFamily={useFont.roboto_regular}
              textTopMagin={8}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 3,
            paddingBottom: 5,
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'column', paddingTop: 8, paddingBottom: 15}}>
            <CustomText
              inputText={'Estimated Delivery Date'}
              textsize={14}
              textcolor={COLORS.grey_78}
              setfontFamily={useFont.roboto_regular}
            />
            <CustomText
              inputText={
                item.estimate_delivery_date
                  ? item.estimate_delivery_date
                  : 'N/A'
              }
              textsize={14}
              textcolor={COLORS.black_1A}
              setfontFamily={useFont.roboto_regular}
            />
          </View>
          <View
            style={{
              backgroundColor: COLORS.border_FE,
              borderRadius: 80, // Half of the height to create an oval shape
              paddingHorizontal: 10,
              paddingVertical: 4,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.black_1A,
                fontFamily: useFont.roboto_medium,
                textAlign: 'center',
              }}>
              {item.status}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
