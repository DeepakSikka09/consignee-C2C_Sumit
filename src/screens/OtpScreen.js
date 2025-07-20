import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {COLORS, styles} from '../constants/theme';
import {Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {versionNumber} from '../utils/utilitiesFuntions';
import {CustomButton} from '../components/CustomButton';
import strings from '../constants/strings';
import {verifyotpApi} from '../repository/data/FetchData';
import setItem from '../repository/LocalStorage/setItems';
import {generateOtpApi} from '../repository/data/FetchData';
import InvalidSvg from '../assets/svg/invalidotp.svg';

export const OtpScreen = ({route, navigation}) => {
  var mobileNumber = route?.params?.mobileNumber;
  var delay_time = route?.params?.delay_time;
  var timerSeconds = delay_time / 1000;
  var timerAttemptSeconds = 30000;
  const [currentIndex, setIndex] = useState(-1);
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(timerSeconds);
  const [isActive, setIsActive] = useState(true); // Timer is active by default
  const [isFormDirty, setIsFormDirty] = useState(true);
  const [visibletimer, setVisibleTimer] = useState(true);
  const [visibletext, setVisibleText] = useState(true);
  const [visibleresend, setVisibleResend] = useState(false);
  const [invalidotp, setInvalidOtp] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [attemptSeconds, setAttemptSeconds] = useState(timerAttemptSeconds);
  const [secondsTimer, setSecondsTimer] = useState(timerAttemptSeconds);
  const maxAttempts = 3;

  const handleLogin = () => {
    const isLoginSuccessful = false; // Replace with your actual login logic

    if (!isLoginSuccessful) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (newAttemptCount >= maxAttempts) {
        setIsLockedOut(true);
      }
    } else {
      setAttemptCount(0);
      setIsLockedOut(false);
    }
  };
  useEffect(() => {
    let timer;
    if (isLockedOut) {
      timer = setTimeout(() => {
        setAttemptCount(0);
        setIsLockedOut(false);
        setInvalidOtp(false);
      }, attemptSeconds);
    }

    return () => clearTimeout(timer);
  }, [isLockedOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsTimer(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsTimer]);

  // Format the remaining time in MM:SS
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!isFormDirty) {
        return;
      }

      e.preventDefault();

      Alert.alert(
        'Want Go Back?',
        'Timer is running.You are not allowed to leave the screen?',
        [{text: 'OK', style: 'cancel', onPress: () => {}}],
      );
    });

    return unsubscribe;
  }, [navigation, isFormDirty]);
  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      setIsFormDirty(false);
      setVisibleTimer(false);
      setVisibleText(false);
      setVisibleResend(true);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  function callToResendApi() {
    generateOtpApi({mobile: mobileNumber}).then(response => {
      if (response.status) {
        setVisibleTimer(true);
        setVisibleText(true);
        setVisibleResend(false);
        clearInterval(null);
        setIsActive(true);
        setIsFormDirty(true);
        setSeconds(timerSeconds);
        setOtp('');
        setIndex(-1);
        ToastAndroid.show(response.description, ToastAndroid.SHORT);
      } else {
        setVisibleTimer(false);
        setVisibleText(false);
        setVisibleResend(true);
        clearInterval(null);
        setIsActive(false);
        setIsFormDirty(false);
        setSeconds(0);
        setOtp('');
        setIndex(-1);
        ToastAndroid.show(response.description, ToastAndroid.SHORT);
      }
    });
  }
  function callToVerifyApi(finalOtp) {
    verifyotpApi({mobile: mobileNumber, otp: finalOtp}).then(response => {
      console.log('--' + JSON.stringify(response));
      if (response.status) {
        setInvalidOtp(false);
        setItem('userToken', response.data.auth_key);
        navigation.navigate('HomePage');
      } else {
        if (response.description === 'Invalid OTP') {
          setAttemptSeconds(parseFloat(response.data.time_difference));
          setSecondsTimer(parseFloat(response.data.time_difference) / 1000);
          setInvalidOtp(true);
          handleLogin();
        }
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
          Please enter the 4 digit verification code sent to {mobileNumber}
        </Text>
        <View style={screenStyles.otpLayout}>
          {[useRef(), useRef(), useRef(), useRef(), useRef(), useRef()].map(
            (ref, id, refList) => {
              return (
                <View
                  key={id}
                  style={[
                    screenStyles.otpInput,
                    {
                      backgroundColor:
                        currentIndex == id ? 'transparent' : COLORS.blue_F4,
                      borderColor:
                        currentIndex == id ? 'black' : COLORS.blue_F4,
                    },
                  ]}>
                  <TextInput
                    value={otp[id]}
                    onChangeText={text => {
                      const newOtp = [...otp];
                      newOtp[id] = text;
                      setOtp(newOtp);
                      if (text != '' && id != 5) {
                        refList[id + 1].current.focus();
                      }
                      if (text == '' && id != 0) {
                        refList[id - 1].current.focus();
                      }
                    }}
                    maxLength={1}
                    outlineColor="transparent"
                    style={{
                      backgroundColor: 'transparent',
                    }}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    onFocus={() => {
                      setIndex(id);
                    }}
                    ref={ref}
                    keyboardType="numeric"
                  />
                </View>
              );
            },
          )}
        </View>
        {invalidotp && !isLockedOut && (
          <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 10}}>
            <InvalidSvg></InvalidSvg>
            <Text
              style={{
                color: COLORS.invalidColor,
                fontSize: 14,
                fontWeight: '500',
                alignSelf: 'flex-start',
                marginLeft: 10,
              }}>
              Please enter correct code
            </Text>
          </View>
        )}
        {invalidotp && isLockedOut && (
          <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 10}}>
            <InvalidSvg></InvalidSvg>
            <Text
              style={{
                color: COLORS.invalidColor,
                fontSize: 14,
                fontWeight: '500',
                alignSelf: 'flex-start',
                marginLeft: 10,
              }}>
              Try again after {attemptSeconds / 1000} seconds
            </Text>
          </View>
        )}
        {!isLockedOut && (
          <View style={{marginTop: 40}}>
            <CustomButton
              isEnable={true}
              btnTitle={strings.Verify_code}
              onPress={() => {
                if (otp.length === 6) {
                  const finalOtp = otp.join('');
                  callToVerifyApi(finalOtp);
                } else {
                  ToastAndroid.show(
                    'Please Enter The Valid Otp',
                    ToastAndroid.SHORT,
                  );
                }
              }}
            />
          </View>
        )}
        {isLockedOut && (
          <View style={{marginTop: 40}}>
            <CustomButton
              isEnable={false}
              btnTitle={formatTime(secondsTimer)}
              onPress={() => {
                const finalOtp = otp.join('');
                callToVerifyApi(finalOtp);
              }}
            />
          </View>
        )}
        {!isLockedOut && visibletext && (
          <Text
            style={{
              color: COLORS.blue_F8,
              fontSize: 18,
              fontWeight: '400',
              alignSelf: 'center',
              margin: 10,
            }}>
            {strings.check_text_message_for_your_code}
          </Text>
        )}
        {!isLockedOut && visibletimer && (
          <Text
            style={{
              color: COLORS.black_1A,
              fontSize: 18,
              fontWeight: '400',
              alignSelf: 'flex-start',
              margin: 10,
            }}>
            I didn’t receive a code (0:{seconds})
          </Text>
        )}
        {!isLockedOut && visibleresend && (
          <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 10}}>
            <Text
              style={{
                color: COLORS.black_1A,
                fontSize: 18,
                fontWeight: '400',
                alignSelf: 'flex-start',
              }}>
              I didn’t receive a code{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisibleTimer(true);
                setVisibleText(true);
                setVisibleResend(false);
                clearInterval(null);
                setIsActive(true);
                setIsFormDirty(true);
                setSeconds(timerSeconds);
                setOtp('');
                setIndex(-1);
                callToResendApi();
              }}>
              <Text
                style={[
                  {
                    color: COLORS.black_1A,
                    fontSize: 18,
                    fontWeight: '400',
                    alignSelf: 'flex-start',
                  },
                  {color: COLORS.blue_F8, textDecorationLine: 'underline'},
                ]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {!isLockedOut && (
          <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 10}}>
            <Text
              style={{
                color: COLORS.black_1A,
                fontSize: 18,
                fontWeight: '400',
                alignSelf: 'flex-start',
              }}>
              Wrong mobile number entered?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(strings.login);
              }}>
              <Text
                style={[
                  {
                    color: COLORS.black_1A,
                    fontSize: 18,
                    fontWeight: '400',
                    alignSelf: 'flex-start',
                  },
                  {color: COLORS.blue_F8, textDecorationLine: 'underline'},
                ]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={[
          styles.screenContainer,
          {backgroundColor: COLORS.white, margin: 15, flex: 0.05},
        ]}>
        <Text style={screenStyles.versionText}>Version {versionNumber}</Text>
      </View>
    </SafeAreaView>
  );
};

const screenStyles = StyleSheet.create({
  numberText: {
    fontSize: 18,
    color: COLORS.black_1A,
    marginBottom: 30,
  },
  otpLayout: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 40,
    justifyContent: 'flex-start',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 1,
    borderRadius: 10,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.grey_78,
    alignSelf: 'center',
  },
});
