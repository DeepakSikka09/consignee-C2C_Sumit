import {StyleSheet, ToastAndroid, View} from 'react-native';
import {CustomToolbar} from './CustomToolbar';
import {CustomButton} from '../components/CustomButton';
import {Searchbar} from 'react-native-paper';
import React from 'react';
import {COLORS} from '../constants';
import {CustomStatusBar} from './CustomStatusBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import strings from '../constants/strings';
import {searchAwbApi} from '../repository/data/FetchData';

export const SearchAwb = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  function callToApi() {
    searchAwbApi({awb_no: searchQuery}).then(response => {
      if (response.status) {
        navigation.navigate('ShipmentItemDescription', {
          awb_no: searchQuery,
          address: response.data.address,
          order_id: response.data.order_id,
          delivery_type: response.data.delivery_type,
          order_origin: response.data.order_origin,
          order_destination: response.data.order_destination,
          all_status: response.data.all_status,
          order_price: response.data.order_price,
        });
      } else {
        ToastAndroid.show(response.description, ToastAndroid.SHORT);
      }
    });
  }
  return (
    <SafeAreaView
      style={{flexDirection: 'column', backgroundColor: 'white', flex: 1}}>
      <CustomStatusBar />
      <CustomToolbar
        toolText={strings.search_awb_order_id}
        navigation={navigation}
      />

      <View
        style={{
          flexDirection: 'column',
          marginTop: 10,
          backgroundColor: COLORS.white,
        }}>
        <Searchbar
          style={style.SearchStyle}
          placeholder={strings.search_awb_order_id}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View style={style.buttonOuterView}>
        <CustomButton
          btnTitle={'Search'}
          isEnable={true}
          onPress={() => {
            callToApi();
          }}></CustomButton>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  SearchStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    margin: 20,
    borderWidth: 1,
    borderColor: COLORS.border_FE,
  },
  buttonOuterView: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border_FE,
    padding: 20,
    position: 'absolute',

    bottom: 0,
    width: '100%',
  },
});
