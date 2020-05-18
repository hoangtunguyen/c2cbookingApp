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

export default Room = ({ plusFontSize, data }) => {
    const DOLLAR_SIGN = '\u0024';
    plusFontSize = plusFontSize == undefined ? 0 : plusFontSize;
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: data.urlImage }}
                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10 }} />
                <TouchableOpacity style={{position: 'absolute', right: 10, top : 10}}>
                    <Icon name="gratipay" size={30 + plusFontSize * 4} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 5, }}>
                    <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 3 }}>
                        <Text style={{ fontSize: 11 + plusFontSize, fontWeight: "500", textTransform: "uppercase" }}>{data.categoryRoom}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                        <Icon name="star" size={20} color="black" />
                        <Text style={{ fontSize: 16 + plusFontSize }}> {data.rating} ({data.votedCount})</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18 + plusFontSize, }}>{data.name}</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={{ fontSize: 18 + plusFontSize, fontWeight: '700' }}>{DOLLAR_SIGN}{data.price}</Text>
                    <Text style={{ fontSize: 18 + plusFontSize }}> /night</Text>
                </View>
            </View>
        </View>

    );
}