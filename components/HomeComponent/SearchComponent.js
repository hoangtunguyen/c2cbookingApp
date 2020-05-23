import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Modal
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { baseURL } from "../../util/Util";
import ModalRN from 'react-native-modal';

export default Search = ({ setData, dataSearch }) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const [searchData, setSearchData] = useState(dataSearch != undefined ? dataSearch : {
        guestCount: null,
        minPrice: null,
        maxPrice: null,
        location: null,
        nameRoom: null,
        roomTypeId: null
    });
    async function searchRoom() {
        try {
            let url = new URL(baseURL + '/room/search');
            Object.keys(searchData).forEach(key => url.searchParams.append(key, searchData[key]))
            const response = await fetch(url);
            if (response.status == 200) {
                const data = await response.json();
                console.log(data);
                setData(data);

            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(searchData);
        searchRoom();
    }, [searchData])
    return (
        <View style={styles.container}>
            <View style={[styles.searchView]}>
                <View style={styles.searchIcon}><Icon name="search" size={27} color="black" /></View>
                <TextInput style={styles.searchInput}
                    placeholder="Search" onChangeText={(val) => setSearchData({ ...searchData, nameRoom: val })}></TextInput>
            </View>
            <ScrollView style={styles.searchMoreView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >

                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: '#80b3ff' }}
                    onPress={() => setIsShowModal(true)}
                >
                    <Text style={styles.searchMoreText}>Filters</Text>
                </TouchableOpacity>
                {
                    searchData["guestCount"] != null &&
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.searchMoreText}>{searchData["guestCount"]} Guests</Text>
                    </TouchableOpacity>
                }
                {
                    searchData["location"] != null &&
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.searchMoreText}>{searchData["location"]}</Text>
                    </TouchableOpacity>
                }
            </ScrollView>

            <ModalRN
                isVisible={isShowModal}
            // onRequestClose={() => setIsShowModal(false)}
            >
                <View style={modalStyles.container}>
                    <TouchableOpacity style={modalStyles.close_bg} onPress={() => setIsShowModal(false)}>
                        <EvilIcons name="close" size={40} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'red', marginHorizontal: 20 }}>
                        <View>
                            <Text>Type of Places</Text>
                        </View>
                    </View>
                </View>
            </ModalRN>
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

        flexDirection: 'row'
    },
    searchMoreText: {
        fontSize: 17,
    }
});
const modalStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 20
    },
    close_bg: {
        // position: 'absolute',
        // top: 20,
        // left: 15,
        marginLeft: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        zIndex: 1,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,


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