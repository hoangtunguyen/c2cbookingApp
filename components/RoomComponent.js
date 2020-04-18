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
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Room = () => {
    return (
        <View>
            <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                style={{ width: 260, height: 150 }} />
            <View></View>
            <Text>Louis bdl, full house</Text>
            <View></View>
        </View>

    );
}