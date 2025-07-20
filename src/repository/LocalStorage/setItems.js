import AsyncStorage from '@react-native-async-storage/async-storage';

async function setItem(key, value) {
  return new Promise(function (resolve, reject) {
    try {
      AsyncStorage.setItem(key, value).then(() => {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
}

export default setItem;
