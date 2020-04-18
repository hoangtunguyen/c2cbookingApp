import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Search = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <View style={styles.searchIcon}><Icon name="search" size={27} color="#fff" /></View>
                <TextInput style={styles.searchInput}
                    placeholder="Search"></TextInput>
            </View>
            <View style={styles.searchMoreView}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.searchMoreText}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.searchMoreText}>Guest</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    searchView: {
        backgroundColor: "#ff9933",
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
    },
    searchIcon: {
        // backgroundColor:'#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        // backgroundColor: "#adc",
        flex: 1,
        height: 50,
        fontSize: 18,
        marginLeft: 5,
    },


    searchMoreView: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: 7,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 15,
    },
    searchMoreText: {
        fontSize: 17,
    }
});