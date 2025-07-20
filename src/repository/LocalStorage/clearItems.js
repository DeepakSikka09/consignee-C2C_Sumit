import AsyncStorage from '@react-native-async-storage/async-storage';

async function clearStorage(key) {
  return new Promise(function (resolve, reject) {
    try {
      AsyncStorage.clear();
    } catch (e) {
      reject(e);
    }
  });
}

export default clearStorage;
