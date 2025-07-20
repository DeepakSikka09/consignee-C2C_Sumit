import {Dimensions} from 'react-native';
import {version} from '../../package.json';

export const calcWidth = size => size * Dimensions.get('window').width;
export const calcHeight = size => size * Dimensions.get('window').height;
export const versionNumber = version;
