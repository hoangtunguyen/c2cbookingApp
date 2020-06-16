import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddPlaceScreen from "../host/AddPlaceScreen";
import { baseURL } from "../../util/Util";
import AsyncStorage from '@react-native-community/async-storage';

export default ListingScreen = ({ navigation }) => {
    const DEAULT_FORM_ROOM = {
        "roomId" : null,
        "roomName": '',
        "description": '',

        "price": 0,
        "serviceFee": 0,
        "feeIncreasingPerson": 0,

        "roomTypeId": null,
        "guestCount": 1,
        "bedroomCount": 0,
        "bedCount": 0,
        "bathroomCount": 0,
        "minGuestCount": 1,



        "location": {
            "lat": "16.068264",
            "lng": "108.218894",
            "street": "53 Nguyen Phuoc Thai",
            "cityId": 2
        },
        "ownerId": 1,
        "urlImage": "https://i.imgur.com/1BZTQO6.png",
        "amenityIdList": []
    };
    const [isShowModal, setIsShowModal] = useState(false);
    const [listRoomData, setListRoomData] = useState(null);
    const [formData, setFormData] = useState(DEAULT_FORM_ROOM);
    async function getListRoom() {
        const USER_ID = await AsyncStorage.getItem('userId');

        try {
            const response = await fetch(baseURL + '/host/listings?userId=' + USER_ID);
            const data = await response.json();
            setListRoomData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    async function getDetailRoom(roomId) {
        // const USER_ID = await AsyncStorage.getItem('userId');
        // console.log(roomId);
        try {
            const response = await fetch(baseURL + '/room/update?roomId=' + roomId);
            const data = await response.json();
            // console.log(data);
            setFormData(data);
            setIsShowModal(true);

        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getListRoom();
    }, []);
    useEffect(() => {
        getListRoom();
    }, [isShowModal]);
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ backgroundColor: 'white', alignItems: 'flex-end', paddingVertical: 5, paddingHorizontal: 25 }}>
                <TouchableOpacity style={{ padding: 5, borderRadius: 50 }}
                    onPress={() => {
                        setFormData(DEAULT_FORM_ROOM);
                        setIsShowModal(true);
                    }}
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
                                onPress={() => {
                                    getDetailRoom(data.roomResponse.id);
                                }}
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
                onRequestClose={() => {setIsShowModal(false); console.log(2)}}
            >
                <AddPlaceScreen setIsShowModal={setIsShowModal} formData={formData}/>
            </Modal>
        </View>
    );
}