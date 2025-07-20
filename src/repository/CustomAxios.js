import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';
import {versionNumber} from '../utils/utilitiesFuntions';
import DeviceInfo from 'react-native-device-info';
import getItem from './LocalStorage/getItem';

const API_BASE_URL = 'https://test2.ecomexpress.in:8058/consignee_app/'; // Testing URL
// const API_BASE_URL = 'http://test2.ecomexpress.in:8058/'; // Prod URL
const customAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'device-id': DeviceInfo.getUniqueID(),
    'device-version': DeviceInfo.getSystemVersion(),
    'device-name': DeviceInfo.getModel(),
    'app-version': versionNumber,
  },
});

axiosCurlirize(customAxios);

customAxios.interceptors.request.use(
  async config => {
    try {
      const token = await getItem('userToken');
      if (token) {
        config.headers['Token'] = token;
      }
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default customAxios;
