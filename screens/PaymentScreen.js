import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import ModalRN from 'react-native-modal';
import InputSpinner from "react-native-input-spinner";
import Moment from 'moment';
import { countDays, calTotalPrice } from "../util/Util";
import { baseURL } from "../util/Util";

export default PaymentScreen = ({ navigation, route }) => {
    const data = route.params["data"];
    const MILISECONDS_PER_DAY = 86400000;
    const [isModalVisible, setModalVisible] = useState(false);
    const [guests, setGuest] = useState(data.minGuestCount);
    const minGuest = data.minGuestCount;
    const maxGuest = data.guestCount;
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [isShowModal, setIsShowModal] = useState(false);
    // const [ipServer, setIpServer] = useState(null);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    // const getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('IP_SERVER')
    //         if (value !== null) {
    //             // value previously stored
    //             setIpServer(value);
    //             console.log(value);
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // }
    function handleCheckoutData(data) {
        if (data.title === 'success') {
            console.log('Success');
            setIsShowModal(false);
            bookRoom();
            // navigation.navigate('Profile');
        } else if (data.title === "cancel") {
            setIsShowModal(false);
        } else return;
    };
    useEffect(() => {
        // getData();
        // bookRoom();
    }, [])
    const dataFormat = (date) => {
        let temp = Moment(new Date(new Date(date).getTime())).format('DD MMM');
        return temp;
    };
    const totalPrice = () => {
        return calTotalPrice({
            price: data.price,
            countDays: countDays(data.checkIn, data.checkOut),
            serviceFee: data.serviceFee,
            minGuests: data.minGuestCount,
            guests: guests,
            increasingPrice: data.increasingPrice
        });
    }

    async function bookRoom() {
        try {
            const response = await fetch(baseURL + '/booking', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "checkInDate": data.checkIn,
                    "checkOutDate": data.checkOut,
                    "bookingDate": new Date(),
                    "roomId": data.id,
                    "userId": 1,
                    "infantCount": 0,
                    "guestCount": guests,
                    "totalCost": totalPrice()+ "",
                    "isPaid" : true
                })
            });
            console.log(response.status);
            if(response.status == 200){
                navigation.popToTop();
            } 
        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 0, alignItems: 'center' }}>
            <ModalRN isVisible={isModalVisible}>
                <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 15 }}>GUESTS</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                        <View>
                            <Text style={{ fontSize: 18 }}>Adults or children: </Text>
                            <Text>Ages 2 or Above</Text>
                        </View>
                        <InputSpinner
                            max={maxGuest}
                            min={minGuest}
                            step={1}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={guests}
                            onChange={(num) => {
                                setGuest(num);
                            }}
                            width={150}
                            height={40}
                            fontSize={18}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginTop: 20, borderTopWidth: 0.2, paddingVertical: 15 }}>
                        <TouchableOpacity style={{ backgroundColor: '#40c5f4', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15 }}
                            onPress={() => toggleModal()}
                        >
                            <Text style={{ fontSize: 16 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalRN>

            <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 100 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ fontSize: 30 }}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: screenWidth, paddingHorizontal: 20, }}>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, borderTopWidth: 0.5 }}>
                    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontWeight: '100', fontSize: 20, textTransform: 'uppercase' }}>{data.categoryRoom}</Text>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>${data.price} / night</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Icon name="star" size={18} color="#4d79ff" />
                            <Text style={{ fontSize: 16, color: '#4d79ff' }}> {data.rating} ({data.votedCount})</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, height: 100, backgroundColor: 'white', alignItems: 'flex-end' }}>
                        <Image source={{ uri: data.urlImage }}
                            style={{ flex: 1, width: 150, height: null, resizeMode: 'cover' }} />
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.titleDate}>Check-in</Text>
                        <Text style={styles.titleDateData}>{dataFormat(data.checkIn)}</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.titleDate}>Check-out</Text>
                        <Text style={styles.titleDateData}>{dataFormat(data.checkOut)}</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={toggleModal}>
                        <Text style={styles.titleDate}>Guests</Text>
                        <Text style={styles.titleDateData}>{guests} guests</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'column', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                    <Text style={{ textTransform: 'uppercase' }}>Tax && Fee Detail</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>${data.price - 0  + (guests > data.minGuestCount ? (guests - data.minGuestCount) * data.increasingPrice : 0)} x {countDays(data.checkIn, data.checkOut)} nights</Text>
                        <Text style={{ fontSize: 18 }}>{totalPrice() - data.serviceFee} $</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>Service</Text>
                        <Text style={{ fontSize: 18 }}>{data.serviceFee} $</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 22 }}>Total</Text>
                    <Text style={{ fontSize: 22 }}>{totalPrice()} $</Text>
                </View>
                <View style={{ backgroundColor: 'white', paddingVertical: 15, borderTopWidth: 0.5, alignItems: 'center' }}>
                    <TouchableOpacity style={{ borderRadius: 10, height: 50, width: 300, backgroundColor: '#ff471a', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => setIsShowModal(true)}>
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                visible={isShowModal}
                onRequestClose={() => setIsShowModal(false)}
            >
                <WebView source={{ uri: baseURL + '/home' }}
                    onNavigationStateChange={(data) => handleCheckoutData(data)}
                    injectedJavaScript={`document.getElementById('price').value =` + totalPrice() + `; document.checkoutForm.submit()`} />
            </Modal>

        </View>
    );
}
const styles = StyleSheet.create({
    titleDate: {
        fontSize: 16
    },
    titleDateData: {
        fontSize: 22,
        color: '#4d79ff'
    }
})