import React from "react";
import {WebView} from 'react-native-webview'


export const WebViewLinks=({route})=>{
  const { url } = route.params;
    return (
        <WebView source={{uri: url}} style={{flex: 1}} />
      );
}