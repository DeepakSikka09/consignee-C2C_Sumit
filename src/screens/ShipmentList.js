import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomStatusBar} from './CustomStatusBar';
import {ShipmentItem} from './ShipmentItem';
import {COLORS, SIZES} from '../constants/theme';
import {CustomToolbar} from './CustomToolbar';
import strings from '../constants/strings';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  View,
  ActivityIndicator,
} from 'react-native';
import {UserShipmentsListApi} from '../repository/data/FetchData';
import {searchAwbApi} from '../repository/data/FetchData';

export const ShipmentList = ({navigation}) => {
  const [shipmentData, setShipmentData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [awbloading, setAwbLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const callShipmentListAPi = () => {
    return UserShipmentsListApi({page_no: pageCount});
  };
  useEffect(() => {
    callShipmentListAPi()
      .then(Response => {
        setLoading(false);
        if (Response.status) {
          if (Response.data.shipment_list.length > 0) {
            setShipmentData(prevData => [
              ...prevData,
              ...Response.data.shipment_list,
            ]);
          } else {
            setEndReached(true);
            console.log('No shipment data available.');
            ToastAndroid.show(
              'No more shipment data available.',
              ToastAndroid.SHORT,
            );
          }
        } else {
          ToastAndroid.show(Response.description, ToastAndroid.SHORT);
        }
      })
      .catch(Error => {
        console.error('Error fetching banner data:', Error);
      });
  }, [pageCount]);

  function callToApi(awb) {
    searchAwbApi({awb_no: awb}).then(response => {
      setAwbLoading(false);
      if (response.status) {
        navigation.navigate('ShipmentItemDescription', {
          awb_no: awb,
          address: response.data.address,
          order_id: response.data.order_id,
          delivery_type: response.data.delivery_type,
          order_origin: response.data.order_origin,
          order_destination: response.data.order_destination,
          all_status: response.data.all_status,
        });
      } else {
        ToastAndroid.show(response.description, ToastAndroid.SHORT);
      }
    });
  }
  const handleLoadMore = () => {
    if (!loading && !endReached) {
      setLoading(true);
      setPageCount(prevPageCount => prevPageCount + 1);
    }
  };
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={style.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };
  const renderItem = ({item}) => <MemoizedItem item={item} />;

  const MemoizedItem = React.memo(({item}) => (
    <ShipmentItem
      item={item}
      onPress={() => {
        setAwbLoading(true);
        callToApi(item.awb);
      }}
    />
  ));
  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <CustomStatusBar></CustomStatusBar>
      <CustomToolbar toolText={strings.shipmentList} navigation={navigation} />

      <FlatList
        data={shipmentData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}></FlatList>

      {awbloading && (
        <View style={style.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgResize: {
    resizeMode: 'cover',
    width: '90%',
    margin: SIZES.SIZE_20,
    justifyContent: 'center',
  },
  SearchStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    margin: SIZES.SIZE_20,
    borderWidth: 1,
    borderColor: COLORS.border_FE,
    fontSize: 50,
    color: COLORS.grey_78,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loader: {
    paddingVertical: 20,
    zIndex: 1,
  },
});
