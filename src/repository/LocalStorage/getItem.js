import AsyncStorage from '@react-native-async-storage/async-storage';

async function getItem(key) {
  return new Promise(function (resolve, reject) {
    try {
      AsyncStorage.getItem(key).then(item => {
        resolve(item);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export default getItem;