import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddPlaceScreen from "../host/AddPlaceScreen";
import { baseURL } from "../../util/Util";

export default ListingScreen = ({ navigation }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [listRoomData, setListRoomData] = useState(null);
    async function getListRoom(userId) {
        try {
            const response = await fetch(baseURL + '/host/listings?userId=' + userId);
            const data = await response.json();
            setListRoomData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListRoom(1);
    }, []);
    useEffect(() => {
        getListRoom(1);
    }, [isShowModal]);
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ backgroundColor: 'white', alignItems: 'flex-end', paddingVertical: 5, paddingHorizontal: 25 }}>
                <TouchableOpacity style={{ padding: 5, borderRadius: 50 }}
                    onPress={() => setIsShowModal(true)}
                >
                    <AntDesign name="plus" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text style={{ fontSize: 30, fontWeight: '700', paddingHorizontal: 20 }}>{listRoomData != null ? listRoomData.length : 0} Listings</Text>
                <View>
                    <Text style={{ fontWeight: '700', fontSize: 25, paddingHorizontal: 20 }}>Available Rooms</Text>
                    {listRoomData != null && listRoomData.length > 0 && listRoomData.map((data, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    margin: 15,
                                    backgroundColor: 'white', height: 170, shadowColor: "#000",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.32,
                                    shadowRadius: 5.46,
                                    elevation: 9,
                                }}>
                                <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                                    <View style={{ flex: 5, paddingRight: 5, justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center' }}>{data.roomResponse.name}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{}}>
                                                <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center' }}>{data.countBooking + ''}</Text>
                                                <Text style={{ fontSize: 16, textAlign: 'center' }}>bookings</Text>
                                            </View>
                                            <View style={{}}>
                                                <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center' }}>{data.totalMoney + ''} $</Text>
                                                <Text style={{ fontSize: 16, textAlign: 'center' }}>money</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: 'white', flex: 3 }}>
                                        <Image source={{ uri: data.roomResponse.urlImage != null ? data.roomResponse.urlImage : 'https://i.imgur.com/IfQIzjm.jpg' }}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })

                    }


                </View>
            </ScrollView>

            <Modal
                visible={isShowModal}
                onRequestClose={() => setIsShowModal(false)}
            >
                <AddPlaceScreen setIsShowModal={setIsShowModal} />
            </Modal>
        </View>
    );
}