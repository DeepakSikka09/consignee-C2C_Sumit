import {
  getBanner,
  generateOtp,
  verifyotp,
  searchAwb,
  UserShipmentsList,
  LandmarkUpdate,
} from '../services/RestApi';

export const getBannerApi = async data => {
  try {
    const response = await getBanner(data);
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error getBanner:', error);
    throw error;
  }
};

export const generateOtpApi = async data => {
  try {
    const response = await generateOtp(data);
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error generateOtp:', error);
    throw error;
  }
};

export const verifyotpApi = async data => {
  try {
    const response = await verifyotp(data);
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error verifyotp:', error);
    throw error;
  }
};

export const searchAwbApi = async data => {
  try {
    const response = await searchAwb(data);
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error searchAwb:', error);
    throw error;
  }
};

export const UserShipmentsListApi = async data => {
  try {
    const response = await UserShipmentsList(data);
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error UserShipmentsList:', error);
    throw error;
  }
};
export const LandmarkUpdateApi = async data => {
  try {
    const response = await LandmarkUpdate(data);
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error verifyotp:', error);
    throw error;
  }
};