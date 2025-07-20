import {Image, ToastAndroid, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import images from '../constants/images';
import PagerView from 'react-native-pager-view';
import {styles} from '../constants/theme';
import {DotIndicator, PagerImageView} from '../components/PagerSlider';
import {CustomButton} from '../components/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import strings from '../constants/strings';
import {getBannerApi} from '../repository/data/FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LandingScreen = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const viewPager = useRef();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getTokenFromAsyncStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken !== null) {
          console.log('Token from AsyncStorage:----' + storedToken);
          navigation.navigate(strings.home);
        } else {
          console.log('No token found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error);
      }
    };

    getTokenFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (list.length == 0) {
      getBannerApi().then(response => {
        if (response.status) {
          setList(response.data.banner_data);
        } else {
          ToastAndroid.show(response.description, ToastAndroid.SHORT);
        }
      });
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(prevIndex => {
        if (prevIndex === list.length - 1) {
          viewPager.current.setPage(0);
          return 0;
        } else {
          viewPager.current.setPage(prevIndex + 1);
          return prevIndex + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [list.length]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.screenContainer, {flex: 1}]}>
        <Image
          source={images.landing_img}
          resizeMode="cover"
          style={{
            width: '100%',
            marginBottom: 10,
            flex: 0.6,
          }}
        />
        <View style={{flex: 0.4}}>
          <PagerView
            initialPage={0}
            ref={viewPager}
            onPageSelected={newState => {
              const newPage = newState.nativeEvent.position;
              setCurrentPage(() => {
                viewPager.current.setPage(newPage);
                return newPage;
              });
            }}
            style={{
              width: '90%',
              margin: 10,
              alignSelf: 'center',
            }}>
            {list.map((item, index) => {
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
              marginBottom: 5,
            }}>
            {list.map((item, index) => {
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
          style={{width: '90%', alignSelf: 'center', margin: 15, flex: 0.1}}>
          <CustomButton
            btnTitle={strings.signUpLogin}
            isEnable={true}
            onPress={() => {
              navigation.navigate(strings.login);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
