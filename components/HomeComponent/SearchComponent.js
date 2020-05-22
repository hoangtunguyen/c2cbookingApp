import React, { useEffect, useState } from 'react';
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
import { baseURL } from "../../util/Util";
export default Search = ({setData}) => {
    const [searchData, setSearchData] = useState({
        guestCount: null,
        minPrice: null,
        maxPrice: null,
        location: null,
        nameRoom: null
    });
    async function searchRoom() {
        try {
            let url = new URL(baseURL + '/room/search');
            Object.keys(searchData).forEach(key => url.searchParams.append(key, searchData[key]))
            const response = await fetch(url);
            if(response.status == 200){
                const data = await response.json();
                setData(data);
                // console.log(data);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        searchRoom();
    }, [searchData])
    return (
        <View style={styles.container}>
            <View style={[styles.searchView]}>
                <View style={styles.searchIcon}><Icon name="search" size={27} color="black" /></View>
                <TextInput style={styles.searchInput}
                    placeholder="Search" onChangeText={(val) => setSearchData({ ...searchData, nameRoom: val })}></TextInput>
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
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.searchMoreText}>Filters</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 10
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    searchView: {
        // backgroundColor: "#ff9933",
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
        borderWidth: 1
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