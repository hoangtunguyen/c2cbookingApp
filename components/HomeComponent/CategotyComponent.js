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

export default Category = ({data, navigation }) => {
    return (
        <TouchableOpacity style={styles.boxCategory}
        onPress={() => navigation.navigate("ShowAllRooms", {roomTypeId : data.id})}
        >
            <View style={{ flex: 5  }}>
                <Image source={{ uri: data.urlIcon }}
                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
            </View>
            <View style={{ flex: 2, paddingLeft: 10, paddingTop: 5 }}><Text>{data.typename === undefined ? "Room" : data.typename}</Text></View>
        </TouchableOpacity>

    );
}
// 'https://reactjs.org/logo-og.png'
const styles = StyleSheet.create({
    boxCategory: {
        height: 110,
        width: 130,
        marginLeft: 20,
        borderWidth: 2,
        borderColor: "#dddddd",
        // backgroundColor: "#adc",

    },
    borderShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }

})