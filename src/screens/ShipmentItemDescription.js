import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {CustomText, CustomView} from './CustomDesign';
import {TimeLineView} from './TimeLineView';
import {LocationView} from './LocationView';
import {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SubTimeLineView} from './SubTimeLineView';
import {CustomStatusBar} from './CustomStatusBar';
import {COLORS} from '../constants';
import {SIZES, styles, useFont} from '../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../components/CustomButton';
import strings from '../constants/strings';
import {CustomToolbar} from './CustomToolbar';

export const ShipmentItemDescription = ({route, navigation}) => {
  const [deliveryamount, setDeliveryAmount] = useState(true);
  const [locationVisible, setLocationVisible] = useState(true);
  const [shipmentVisible, setShipmentVisible] = useState(false);
  const [orderPrice, setOrderPrice] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState(' ');
  const [shipmentLocation, setShipmentLocation] = useState(' ');
  const [shipmentDate, setShipmentDate] = useState(' ');

  var consigneeawbno = route?.params?.awb_no;
  var consigneeaddress = route?.params?.address;
  var consigneeorderid = route?.params?.order_id;
  var consigneedeliverytype = route?.params?.delivery_type;
  var consigneeorigin = route?.params?.order_origin;
  var consigneedestination = route?.params?.order_destination;
  var consigneestatus = route?.params?.all_status;
  //var consigneeorderprice = route?.params?.order_price;
  const refRBSheet = useRef();
  const FlatListRef = useRef();
  const [flatLisheight, setFlatListHeight] = useState('400');

  useEffect(() => {
    const orderPriceValue = route?.params?.order_price;
    setOrderPrice(orderPriceValue);

    if (isEmpty(orderPriceValue)) {
      setDeliveryAmount(false);
    } else if (
      consigneedeliverytype === 'Prepaid Delivery' ||
      consigneedeliverytype === 'PPD'
    ) {
      setDeliveryAmount(false);
    } else {
      setDeliveryAmount(true);
    }
  }, [route?.params?.order_price]);

  const onFlatListContentSizeChange = contentHeight => {
    // Calculate the desired height for RBSheet based on FlatList content height
    const newSheetHeight = contentHeight + 100; // Add additional space if needed
    setFlatListHeight(newSheetHeight);
  };

  // Update height when DATA changes
  const DATA = consigneestatus;
  const [data, setData] = useState(consigneestatus);
  const filterData = () => {
    const filteredArray = data.filter(
      item =>
        item.status === 'Information Received' ||
        item.status === 'Pickup Completed' ||
        item.status === 'In-Transit' ||
        item.status === 'Shipment Delivered' ||
        item.status === 'Shipment Undelivered',
    );

    if (filteredArray.length === 1) {
      const newItem = [
        {status: 'Pickup Completed', location: '', date: ''},
        {status: 'In-Transit', location: '', date: ''},
        {status: 'Out for Delivery', location: '', date: ''},
      ];
      setData(filteredArray.concat(newItem));
    } else if (filteredArray.length === 2) {
      const newItem = [
        {status: 'In-Transit', location: '', date: ''},
        {status: 'Out for Delivery', location: '', date: ''},
      ];
      setData(filteredArray.concat(newItem));
    } else if (filteredArray.length === 3) {
      const newItem = {status: 'Out for Delivery', location: '', date: ''};
      setData(filteredArray.concat(newItem));
    } else if (filteredArray.length === 4) {
      setShipmentStatus(filteredArray[3].status);
      setShipmentLocation(filteredArray[3].location);
      setShipmentDate(filteredArray[3].date);
      setLocationVisible(false);
      setShipmentVisible(true);
      setData(filteredArray);
    }
  };

  useEffect(() => {
    filterData();
  }, []);

  const renderItem = ({item, index}) => (
    <TimeLineView
      item={item}
      index={index}
      onPress={() => refRBSheet.current.open()}
    />
  );
  const renderItemSubTimeLine = ({item, index}) => (
    <SubTimeLineView item={item} index={index} indexlength={DATA.length} />
  );
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.backgroundColor,
        flexDirection: 'column',
        flex: 1,
      }}>
      <CustomStatusBar></CustomStatusBar>
      <CustomToolbar
        toolText={'AWB: ' + consigneeawbno}
        navigation={navigation}></CustomToolbar>
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}>
        <CustomText
          inputText={'Order Id :' + consigneeorderid}
          textsize={21}
          textcolor={COLORS.black_1A}
          setfontFamily={useFont.roboto_bold}></CustomText>
      </View>
      <CustomView
        showingText={consigneedeliverytype}
        textsize={SIZES.SIZE_21}
        textcolor={COLORS.black_1A}
      />
      {deliveryamount && (
        <View>
          <CustomView
            showingText={'Amount to be Paid: ' + orderPrice}
            textsize={SIZES.SIZE_18}
            textcolor={COLORS.black_1A}
          />
        </View>
      )}
      {locationVisible && (
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 15,
            paddingHorizontal: 20,
            marginTop: 8,
          }}>
          <LocationView
            origin={consigneeorigin}
            destination={consigneedestination}></LocationView>
        </View>
      )}

      {shipmentVisible && (
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingVertical: 15,
            paddingHorizontal: 20,
            marginTop: 8,
          }}>
          <CustomText
            inputText={shipmentStatus}
            textsize={27}
            textcolor={COLORS.black_1A}
            fontweighting={'600'}></CustomText>
          <CustomText
            inputText={shipmentDate}
            textsize={18}
            textcolor={COLORS.black_1A}
            fontweighting={'400'}></CustomText>
          <CustomText
            inputText={shipmentLocation}
            textsize={18}
            textcolor={COLORS.black_1A}
            fontweighting={'400'}></CustomText>
        </View>
      )}

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          flexDirection: 'column',
          marginTop: 10,
          padding: 10,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}></FlatList>
      </View>
      {locationVisible && (
        <View style={styles.buttonOuterView}>
          <CustomButton
            btnTitle={strings.verify_address}
            isEnable={true}
            onPress={() => {
              navigation.navigate('ViewAddress', {
                awb_no: consigneeawbno,
                address: consigneeaddress,
                order_id: consigneeorderid,
                delivery_type: consigneedeliverytype,
              });
            }}></CustomButton>
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        height={flatLisheight}
        draggable={true}
        closeOnPressBack={true}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 100, // Add elevation for shadow (Android)
            shadowColor: COLORS.black, // Shadow color (iOS)
            shadowOffset: {width: 0, height: 2}, // Shadow offset (iOS)
            shadowOpacity: 0.8, // Shadow opacity (iOS)
            shadowRadius: 3, // Shadow radius (iOS)
            backgroundColor: COLORS.white, // BBackground color of the sheet
          },
          draggableIcon: {
            backgroundColor: COLORS.black,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
            flexDirection: 'column',
            marginTop: 10,
            padding: 10,
          }}>
          <FlatList
            ref={FlatListRef}
            data={DATA}
            renderItem={renderItemSubTimeLine}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={onFlatListContentSizeChange}></FlatList>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
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
const isEmpty = value => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0)
  );
};
