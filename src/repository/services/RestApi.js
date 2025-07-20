import AxiosCurlirize from 'axios-curlirize';
import customAxios from '../CustomAxios';
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';

const checkAndNotifyConnectivity = async () => {
  const state = await NetInfo.fetch();
  if (!state.isConnected || !state.isInternetReachable) {
    ToastAndroid.show('No internet connection', ToastAndroid.SHORT);
    return false; // Indicates no connectivity
  }
  return true; // Indicates connectivity
};



export const getBanner = async data => {
  try {

    if (!await checkAndNotifyConnectivity()) {
      return; // Exit if no connectivity
    }
    const response = await customAxios.post(
      'shipment/getBanner/',
      JSON.stringify(data),
    );
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error getBanner:', error);
    throw error;
  }
};

// genrate OTP by Mobile Number
export const generateOtp = async data => {
  try {
    
    if (!await checkAndNotifyConnectivity()) {
      return; // Exit if no connectivity
    }
    const response = await customAxios.post(
      'authentication/generateOtp/',
      JSON.stringify(data),
    );
    // AxiosCurlirize(response);
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error generateOtp:', error);
    throw error;
  }
};

// Verify OTP by mobile number
export const verifyotp = async data => {
  try {
  
    if (!await checkAndNotifyConnectivity()) {
      return; // Exit if no connectivity
    }
    const response = await customAxios.post(
      'authentication/verify-otp/',
      JSON.stringify(data),
    );
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error verify-otp:', error);
    throw error;
  }
};

// search AWB number
export const searchAwb = async data => {
  try {
    if (!await checkAndNotifyConnectivity()) {
      return; // Exit if no connectivity
    }
    const response = await customAxios.post(
      'shipment/searchAwb/',
      JSON.stringify(data),
    );
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error searchAwb:', error);
    throw error;
  }
};

// fetch User Shipments List
export const UserShipmentsList = async data => {
  try {
    if (!await checkAndNotifyConnectivity()) {
      return; // Exit if no connectivity
    }
    const response = await customAxios.post(
      'shipment/UserShipmentsList/',
      JSON.stringify(data),
    );
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error UserShipmentsList:', error);
    throw error;
  }
};

// fetch User landmarkUpdate
export const LandmarkUpdate = async data => {
  try {
    if (!await checkAndNotifyConnectivity()) {
      return; // Exit if no connectivity
    }
    const response = await customAxios.post(
      'shipment/landmarkUpdate/',
      JSON.stringify(data),
    );
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error landmarkUpdate:', error);
    throw error;
  }
};




