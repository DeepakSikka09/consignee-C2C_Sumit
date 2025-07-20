import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {CustomText} from './CustomDesign.js';
import {CustomProfileBar} from './HomePageToolbar.js';
import {CustomToolbar} from './CustomToolbar.js';
import LogoutSvg from '../assets/svg/logout.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import clearStorage from '../repository/LocalStorage/clearItems.js';
export const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{backgroundColor: '#FFFFFF', flex: 1, flexDirection: 'column'}}>
      <StatusBar />
      <CustomToolbar toolText={'Profile'} navigation={navigation} />
      <CustomProfileBar />

      <View style={styles.containerMain}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <LogoutSvg width={40} height={50} />
            <TouchableOpacity
              onPress={() => {
                clearStorage('userToken');
                setTimeout(() => {
                  navigation.navigate('Landing');
                }, 1000);
              }}>
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <CustomText
                  inputText={'Logout'}
                  textsize={18}
                  textcolor={'#1A1A1A'}
                  fontweighting={'500'}
                />

                <CustomText
                  inputText={'Logout from Application'}
                  textsize={12}
                  textcolor={'#1A1A1A'}
                  fontweighting={'400'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomView}>
          <CustomText
            inputText={'Version 1.035'}
            textsize={12}
            textcolor={'#6E7478'}
            fontweighting={'400'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#25408F',
    borderRadius: 6,
    alignSelf: 'center',
    width: '95%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
