import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import {COLORS} from '../constants';
import {OtpScreen} from '../screens/OtpScreen';
import {HomePage} from '../screens/HomePage';
import {ShipmentItemDescription} from '../screens/ShipmentItemDescription';
import {ViewAddress} from '../screens/ViewAddress';
import Submit from '../screens/Submit';
import {SearchAwb} from '../screens/SearchAwb';
import {ShipmentList} from '../screens/ShipmentList';
import {ProfileScreen} from '../screens/ProfileScreen';
import {WebViewLinks} from '../screens/WebViewLinks';

const Stack = createNativeStackNavigator();

export default ScreensStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerTitleStyle: {
            color: COLORS.black_1A,
            fontSize: 21,
            fontWeight: '700',
          },
          headerStyle: {
            backgroundColor: COLORS.blue_FF,
          },
          navigationBarColor: COLORS.white,
        }}>
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{headerShown: false, navigationBarColor: COLORS.blue_FF}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerBackButtonMenuEnabled: true,
            title: 'Sign Up / Login',
          }}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{
            headerBackButtonMenuEnabled: true,
            title: 'Enter Verification Code',
          }}
        />

        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false, headerBackButtonMenuEnabled: false}}
        />

        <Stack.Screen
          name="ShipmentItemDescription"
          component={ShipmentItemDescription}
          options={{headerShown: false, headerBackButtonMenuEnabled: false}}
        />

        <Stack.Screen
          name="Submit"
          component={Submit}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ViewAddress"
          component={ViewAddress}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SearchAwb"
          component={SearchAwb}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShipmentList"
          component={ShipmentList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebViewLinks"
          component={WebViewLinks}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
