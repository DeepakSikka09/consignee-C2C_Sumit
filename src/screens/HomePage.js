import React, {useEffect, useRef, useState} from 'react';
import {HomePageToolbar} from './HomePageToolbar';
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {CustomText} from './CustomDesign';
import {ShipmentItem} from './ShipmentItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import Arrowdown from '../assets/svg/arrowdown.svg';
import {COLORS, SIZES, useFont} from '../constants/theme';
import {CustomStatusBar} from './CustomStatusBar';
import SearchSvg from '../assets/svg/searchIcon.svg';
import strings from '../constants/strings';
import {Text} from 'react-native-paper';
import {UserShipmentsListApi} from '../repository/data/FetchData';
import images from '../constants/images';
import {DotIndicator, PagerImageView} from '../components/PagerSlider';
import {searchAwbApi} from '../repository/data/FetchData';
import clearStorage from '../repository/LocalStorage/clearItems.js';
import {useFocusEffect} from '@react-navigation/native';

export const HomePage = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [bannerData, setBannerData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const viewPager = useRef();
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  const callShipmentListAPi = () => {
    return UserShipmentsListApi({page_no: pageCount});
  };
  function callToApi(awb) {
    searchAwbApi({awb_no: awb}).then(response => {
      console.log('data: ', ' / ' + JSON.stringify(response));
      setLoading(false);
      if (response.status) {
        navigation.navigate('ShipmentItemDescription', {
          awb_no: awb,
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

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (backPressedOnce) {
          BackHandler.exitApp(); 
          return true;
        }

        setBackPressedOnce(true);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

        // Reset the backPressedOnce state after 2 seconds
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true;
      };

      // Add the back button listener when the screen is focused
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup the listener when the screen is unfocused
    }, [backPressedOnce]),
  );

  useEffect(() => {
    callShipmentListAPi()
      .then(Response => {
        setLoading(false);
        if (Response.status) {
          if (bannerData.length == 0) {
            setBannerData(Response.data.banner_data);
          }
          // Check if shipment_list exists and is not empty
          if (Response.data.shipment_list.length > 0) {
            setShipmentData(Response.data.shipment_list);
          } else {
            console.log('No shipment data available.');
            ToastAndroid.show(
              'No more shipment data available.',
              ToastAndroid.SHORT,
            );
          }
        } else {
          if (Response.description === 'Something Went Wrong in Token') {
            clearStorage('userToken');
            setTimeout(() => {
              navigation.navigate('Landing');
            }, 1000);
          }
          ToastAndroid.show(Response.description, ToastAndroid.SHORT);
        }
      })
      .catch(Error => {
        console.error('Error fetching banner data:', Error);
      });
  }, [pageCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(prevIndex => {
        if (prevIndex === bannerData.length - 1) {
          viewPager.current.setPage(0);
          return 0;
        } else {
          viewPager.current.setPage(prevIndex + 1);
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerData.length]);

  const renderItem = ({item}) => <MemoizedItem item={item} />;

  const MemoizedItem = React.memo(({item}) => (
    <ShipmentItem
      item={item}
      onPress={() => {
        setLoading(true);
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
      <HomePageToolbar navigation={navigation} />

      <View style={{backgroundColor: COLORS.white, flex: 0.6}}>
        <PagerView
          style={{
            backgroundColor: 'white',
            marginTop: 15,
            marginHorizontal: 20,
            height: '75%',
          }}
          initialPage={0}
          ref={viewPager}
          onPageSelected={newState => {
            const newPage = newState.nativeEvent.position;
            setCurrentPage(() => {
              viewPager.current.setPage(newPage);
              return newPage;
            });
          }}>
          {bannerData.map((item, index) => {
            return (
              <PagerImageView
                imageUrl={item.banner_path}
                key={index}
                keyValue={index}
              />
            );
          })}
        </PagerView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 10,
          }}>
          {bannerData.map((item, index) => {
            return (
              <DotIndicator
                selectedIndex={currentPage}
                key={index}
                keyValue={index}
              />
            );
          })}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 10,
          backgroundColor: 'white',
          flex: 0.2,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(strings.searchAwb);
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.white,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.border_FE,

              padding: 10,
              marginHorizontal: 20,
              marginVertical: 15,
              bottom: 0,
              alignItems: 'center',
            }}>
            <SearchSvg />
            <Text
              style={{
                color: COLORS.grey_78,
                fontSize: 15,
                fontFamily: useFont.roboto_medium,
                marginStart: 15,
              }}>
              {strings.search_awb_order_id}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          flexDirection: 'column',
          marginTop: 10,
          padding: 10,
        }}>
        <CustomText
          inputText={strings.shipment}
          textsize={21}
          textcolor={COLORS.black_1A}
          textleftmargin={20}
          textTopMagin={15}
          setfontFamily={useFont.roboto_bold}></CustomText>

        <FlatList
          data={shipmentData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}></FlatList>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(strings.shipmentList);
          }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              flexDirection: 'row',
              borderRadius: 5,
              borderWidth: 1,
              marginHorizontal: SIZES.SIZE_20,
              marginVertical: 5,
              borderColor: COLORS.border_FE,
              alignItems: 'center',
              padding: 8,
              justifyContent: 'center',
            }}>
            <CustomText
              inputText={strings.view_more}
              textsize={14}
              textcolor={'black'}
              setfontFamily={useFont.roboto_regular}
              alignItems={'center'}
            />
            <Arrowdown />
          </View>
        </TouchableOpacity>
      </View>
      {loading && (
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
});
