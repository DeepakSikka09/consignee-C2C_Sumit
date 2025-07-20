import React from 'react';
import {styles} from '../constants/theme';
import {View, Image} from 'react-native';
import {COLORS} from '../constants/theme';
export const PagerImageView = ({imageUrl, keyValue}) => {
  return (
    <View key={keyValue} style={styles.pagerItem}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: '100%',
          height:'100%',
          backgroundColor: 'transparent',
        }}
        resizeMode="stretch"
      />
    </View>
  );
};

export const DotIndicator = ({selectedIndex, keyValue}) => {
  return (
    <View
      key={keyValue}
      style={{
        height: 10,
        width: 10,
        backgroundColor:
          selectedIndex == keyValue ? COLORS.black_1A : COLORS.grey_78,
        borderRadius: 50,
        marginHorizontal: 2,
      }}
    />
  );
};
