import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5ICon from 'react-native-vector-icons/FontAwesome5';

export default Room = () => {
    const widthBox = 230;
    const DOLLAR_SIGN = '\u0024';
    return (
        <View style={{ width: widthBox, marginLeft: 20, backgroundColor: 'white' }}>
            <Image source={{ uri: 'https://pix6.agoda.net/hotelImages/4656079/-1/f7771c6afc7cc32401286116a7eed6f0.jpg' }}
                style={{ width: widthBox, height: 130 }} />
            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 5, }}>
                <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 14, fontWeight: "700", textTransform: "uppercase" }}>House</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                    <Icon name="star" size={20} color="black" />
                    <Text style={{ fontSize: 14 }}> 4.9 (102)</Text>
                </View>
            </View>
            <Text style={{ fontSize: 18, }}>Louis bdl, full house in downtown</Text>
            <View style={{ flexDirection: 'row' }}>

                <Text style={{ fontSize: 18, fontWeight: '700' }}>{DOLLAR_SIGN}10</Text>
                <Text style={{ fontSize: 18 }}> /night</Text>
            </View>
        </View>

    );
}