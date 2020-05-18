import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Button, Dimensions, StyleSheet, Modal } from 'react-native';
import Search from "../components/HomeComponent/SearchComponent";
import RoomComponent from '../components/HomeComponent/RoomComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import WholeMapComponent from "../components/OtherComponent/WholeMapComponent";
import { baseURL } from "../util/Util";

export default ShowAllRoomsScreen = ({navigation}) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [allRoomData, setAllRoomData] = useState(null);
    async function getAllRooms() {
        try {
            const response = await fetch(baseURL + '/room/viewAll');
            const data = await response.json();
            setAllRoomData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getAllRooms();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Search />
                <ScrollView>
                    <View style={{ marginLeft: 20, marginBottom: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>Show more 100+ stays</Text>
                    </View>
                    {
                        allRoomData != null && allRoomData.map((data, index) =>{
                            return(
                                <TouchableOpacity style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}
                                key={index}
                                onPress={()=> navigation.navigate('DetailRoom', {idRoom : data.id})}
                                >
                                    <RoomComponent plusFontSize={3} data={data} />
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.mapView} onPress={() => navigation.navigate('WholeMap')}>
                <Icon name="map-marker" size={30} color="black" />
            </TouchableOpacity>
            {/* <Modal
                visible={isShowModal}
                onRequestClose={() => setIsShowModal(false)}
            >
                <WholeMapComponent navigation={navigation} setIsShowModal={setIsShowModal} />
            </Modal> */}
        </View>
    );
}
const styles = StyleSheet.create({
    mapView: {
        position: "absolute",
        bottom: 15,
        right: 10,
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',

        // shadow custom
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },

})
