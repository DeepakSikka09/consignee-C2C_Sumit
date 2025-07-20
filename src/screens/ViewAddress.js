import {View, TextInput, StyleSheet, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {CustomText} from './CustomDesign.js';
import {Card} from 'react-native-paper';
import {CustomToolbar} from './CustomToolbar.js';
import LocationSvg from '../assets/svg/location.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/theme.js';
import {CustomButton} from '../components/CustomButton.js';
import strings from '../constants/strings.js';
import {LandmarkUpdateApi} from '../repository/data/FetchData.js';

export const ViewAddress = ({route, navigation}) => {
  var consigneeawbno = route?.params?.awb_no;
  var consigneeaddress = route?.params?.address;
  var consigneeorderid = route?.params?.order_id;
  var consigneedeliverytype = route?.params?.delivery_type;

  const [value, setValue] = useState('');
  function callToOTPApi() {
    LandmarkUpdateApi({
      awb_no: consigneeawbno,
      landmark: value,
      order_id: consigneeorderid,
      delivery_type: consigneedeliverytype,
      awb_address: consigneeaddress,
    }).then(response => {
      if (response.status) {
        navigation.navigate(strings.submit);
      } else {
        ToastAndroid.show(response.description, ToastAndroid.SHORT);
      }
    });
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.backgroundColor,
        flex: 1,
        flexDirection: 'column',
      }}>
      <CustomToolbar toolText={'View Address'} navigation={navigation} />
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}>
        <CustomText
          inputText={'AWB: ' + consigneeawbno}
          textsize={21}
          textcolor={COLORS.black_1A}
          fontweighting={'700'}></CustomText>
        <CustomText
          inputText={'Order Id: ' + consigneeorderid}
          textsize={16}
          textcolor={COLORS.black_1A}
          fontweighting={'400'}></CustomText>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginTop: 8,
          alignItems: 'center',
        }}>
        <CustomText
          inputText={consigneedeliverytype}
          textsize={21}
          textcolor={COLORS.black_1A}
          fontweighting={'500'}></CustomText>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginTop: 8,
        }}>
        <CustomText
          inputText={'Shipping address'}
          textsize={21}
          textcolor={COLORS.black_1A}
          fontweighting={'600'}></CustomText>

        <Card style={{marginVertical: 10, backgroundColor: COLORS.white}}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}>
            <LocationSvg width={25} height={60}></LocationSvg>
            <View style={{marginLeft: 15}}>
              <CustomText
                inputText={consigneeaddress}
                textsize={16}
                textcolor={'#1A1A1A'}
                fontweighting={'400'}
              />
            </View>
          </View>
        </Card>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginTop: 8,
          flex: 1,
        }}>
        <CustomText
          inputText={'Add Landmark'}
          textsize={21}
          textcolor={COLORS.black_1A}
          fontweighting={'600'}></CustomText>
        <TextInput
          placeholder={strings.enter_landmark}
          placeholderTextColor={COLORS.gray_label}
          fontweighting={'500'}
          textsize={21}
          value={value}
          onChangeText={text => {
            setValue(text);
          }}
          multiline={true}
          textAlign="left"
          textAlignVertical="top"
          style={{
            height: 100,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderWidth: 1,
            borderColor: COLORS.grey_CD,
            borderRadius: 4,
            marginTop: 10,
            backgroundColor: COLORS.white,
          }}
        />
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          btnTitle={strings.submit}
          isEnable={true}
          onPress={() => {
            callToOTPApi();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 2,
    width: '100%',
    marginBottom: 10,
    backgroundColor: COLORS.backgroundColor, // You can change the color as needed
  },
  bottomView: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 80,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: COLORS.white,
    fontSize: 18,
  },
  button: {
    backgroundColor: COLORS.blue_8F,
    borderRadius: 6,
    alignSelf: 'center',
    width: '95%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border_FE,
    bottom: 0,
    width: '100%',
    padding: 20,
  },
});
