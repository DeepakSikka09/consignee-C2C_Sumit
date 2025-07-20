import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomText} from './CustomDesign';
import Successsvg from '../assets/svg/successtick.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants';
import {CustomButton} from '../components/CustomButton';
import strings from '../constants/strings';

const Submit = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={style.containerMain}>
        <View
          style={{
            flexDirection: 'column',
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}>
          <Successsvg width={35} height={35} style={{alignSelf: 'center'}} />

          <View style={{marginTop: 20}}>
            <CustomText
              inputText={'Thank You for Added Landmark Successfully'}
              textsize={21}
              textcolor={COLORS.black_1A}
              fontweighting={'600'}
              inputTextAlign={'center'}></CustomText>
          </View>
        </View>

        <View style={style.bottomView}>
          <CustomButton
            btnTitle={strings.submit}
            isEnable={true}
            onPress={() => {
              navigation.navigate(strings.home);
            }}></CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  containerMain: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 2,
    width: '100%',
    marginBottom: 10,
    backgroundColor: COLORS.blue_FF,
  },
  bottomView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border_FE,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textStyle: {
    color: '#fff',
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
});
export default Submit;
