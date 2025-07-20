import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, styles} from '../constants/theme';
import {Text, TextInput} from 'react-native-paper';
import {CustomButton} from '../components/CustomButton';
import {versionNumber} from '../utils/utilitiesFuntions';
import {SafeAreaView} from 'react-native-safe-area-context';
import strings from '../constants/strings';
import {generateOtpApi} from '../repository/data/FetchData';

const LoginScreen = ({navigation}) => {
  const [number, setNumber] = useState('');

  function callToOTPApi() {
    generateOtpApi({mobile: number}).then(response => {
      if (response.status) {
        navigation.navigate('Otp', {
          mobileNumber: number,
          delay_time: response.data.delay_time,
        });
      } else {
        ToastAndroid.show(response.description, ToastAndroid.SHORT);
      }
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={[
          styles.screenContainer,
          {backgroundColor: COLORS.white, margin: 15, flex: 0.95},
        ]}>
        <Text
          style={{
            color: COLORS.black_1A,
            fontSize: 18,
            fontWeight: '400',
            alignSelf: 'flex-start',
          }}>
          We will send you a code via SMS on the mobile number you enter
        </Text>
        <TextInput
          left={
            <TextInput.Affix
              text="+91"
              textStyle={{
                color: COLORS.black_1A,
                fontSize: 21,
                fontWeight: '600',
              }}
            />
          }
          label="Enter Number"
          style={{
            backgroundColor: 'transparent',
            borderColor: COLORS.blue_8F,
            marginTop: 40,
            color: COLORS.black_1A,
            fontSize: 21,
            fontWeight: '600',
            marginBottom: 30,
          }}
          activeOutlineColor={COLORS.blue_8F}
          outlineStyle={{borderStyle: 'solid'}}
          mode="outlined"
          outlineColor={COLORS.grey_CD}
          keyboardType="phone-pad"
          maxLength={10}
          value={number}
          onChangeText={text => {
            if (!isNaN(text) && (text.charAt(0) >= 6 || text.charAt(0) == ''))
              setNumber(text);
          }}
          theme={{
            colors: {
              onSurfaceVariant: COLORS.gray_label,
            },
          }}
        />
        <CustomButton
          btnTitle={strings.send_code}
          isEnable={number.length === 10}
          onPress={() => {
            Keyboard.dismiss();
            callToOTPApi();
          }}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 30}}>
          <Text style={textStyles.simpleText}>{strings.by_proceeding}</Text>
          <TouchableOpacity
            style={{marginHorizontal: 5}}
            onPress={() => {
              navigation.navigate('WebViewLinks', {
                url: 'https://ecom-link.s3.ap-south-1.amazonaws.com/privacy_policy.html',
              });
            }}>
            <Text style={[textStyles.simpleText, textStyles.clickText]}>
              {' ' + strings.terms_of_service}
            </Text>
          </TouchableOpacity>
          <Text style={textStyles.simpleText}> and </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.navigate('WebViewLinks', {
                url: 'https://ecom-link.s3.ap-south-1.amazonaws.com/privacy_policy.html',
              });
            }}>
            <Text style={[textStyles.simpleText, textStyles.clickText]}>
              {strings.privacy_policy}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.screenContainer,
          {backgroundColor: COLORS.white, margin: 15, flex: 0.05},
        ]}>
        <Text style={textStyles.versionText}>Version {versionNumber}</Text>
      </View>
    </SafeAreaView>
  );
};
const textStyles = StyleSheet.create({
  simpleText: {
    fontSize: 14,
    color: COLORS.grey_78,
    fontWeight: '500',
  },
  clickText: {
    color: COLORS.blue_F8,
    textDecorationLine: 'underline',
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.grey_78,
    alignSelf: 'center',
  },
});

export default LoginScreen;
