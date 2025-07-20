import React, {useEffect} from 'react';
import ScreensStack from './src/components/ScreensStack'
import SplashScreen from 'react-native-splash-screen';

export default App = () => {
  useEffect => {(
    setTimeout()
  )}

  setTimeout(() => {
    SplashScreen.hide();
  }, 2000)

  return(
   <ScreensStack/>
  )
};
