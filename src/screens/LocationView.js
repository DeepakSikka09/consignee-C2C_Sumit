import React from 'react';
import {View} from 'react-native';
import {CustomText} from './CustomDesign';
import Initiallocation from '../assets/svg/initiallocation.svg';
import Finallocation from '../assets/svg/finallocation.svg';
import VerticalView from '../assets/svg/verticalview.svg';
import { COLORS } from "../constants";
import { useFont } from "../constants/theme";
export const LocationView = ({origin,destination}) => {


    return (
        <View>
            <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: "row" }}>
                    <Initiallocation style={{ marginEnd: 8 }}></Initiallocation>
                    <CustomText inputText={origin} textsize={18} textcolor={COLORS.black_1A} setfontFamily={useFont.roboto_medium}  ></CustomText>
                </View>
                <VerticalView style={{ marginStart: 8 }}></VerticalView>
                <View style={{ flexDirection: "row", }}>
                    <Finallocation style={{ marginEnd: 8 }}></Finallocation>
                    <CustomText inputText={destination} textsize={18} textcolor={COLORS.black_1A} setfontFamily={useFont.roboto_medium}    ></CustomText>
                </View>
            </View>
        </View>
    )
}