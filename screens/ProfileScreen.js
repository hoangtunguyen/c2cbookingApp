import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { baseURL } from "../util/Util";
import ModalRN from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { countDays, calTotalPrice, dataFormat } from "../util/Util";
import AsyncStorage from '@react-native-community/async-storage';

export default ProfileScreen = ({navigation}) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [bookingData, setBookingData] = useState(null);
    const [bookingDetail, setBookingDetail] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        // setIsEnabled(previousState => !previousState);
        navigation.navigate('Host');
    };
    async function getBookingListByUserId() {
        const USER_ID = await AsyncStorage.getItem('userId');
        try {
            const response = await fetch(baseURL + '/booking/list?userId=' + USER_ID);
            const data = await response.json();
            setBookingData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    async function getBookingDetail(bookingId) {
        try {
            const response = await fetch(baseURL + '/booking/detail?bookingId=' + bookingId);
            const data = await response.json();
            setBookingDetail(data);

            setIsShowModal(true);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getBookingListByUserId();
    }, []);
    useEffect(() => {
        getBookingListByUserId();
    });
    const totalPrice = (bookingDetail) => {
        return calTotalPrice({
            price: bookingDetail.roomResponse.price,
            countDays: countDays(bookingDetail.checkInDate, bookingDetail.checkOutDate),
            serviceFee: bookingDetail.roomResponse.serviceFee,
            minGuests: bookingDetail.roomResponse.minGuestCount,
            guests: bookingDetail.guestCount,
            increasingPrice: bookingDetail.roomResponse.increasingPrice
        });
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.linearGradient}>
                <View style={{ height: 130, width: 130, backgroundColor: 'transparent' }}>
                    <Image source={{ uri: 'https://i.imgur.com/AJhukbs.jpg' }}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100 }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 22 }}>Nguyen Hoang Tu</Text>
                </View>
            </LinearGradient>
            <View style={{ backgroundColor: 'transparent', marginHorizontal: 20 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',  paddingVertical: 10}}>
                    <Text style={{ fontWeight: '700', fontSize: 22 }}>Switch to Owner</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={{ backgroundColor: 'transparent', marginHorizontal: 20 }}>
                <Text style={{ fontWeight: '700', fontSize: 22 }}>Lastest Booking</Text>
                {bookingData != null && bookingData.map((data, key) => {
                    return (
                        <TouchableOpacity style={styles.tagBox} key={key}
                            onPress={() => getBookingDetail(data.id)}
                        >
                            <View style={{ flex: 2, padding: 5, backgroundColor: '#48c6ef', borderRadius: 20, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '600', textTransform: 'uppercase' }}>{data.roomResponse.city}</Text>
                            </View>
                            <View style={{ flex: 7, backgroundColor: 'white', justifyContent: 'center', borderRadius: 20, paddingHorizontal: 5 }}>
                                <Text style={{ fontSize: 18 }}>{data.roomResponse.name}</Text>
                                <Text style={{ fontSize: 20, fontWeight: '700' }}>${data.totalCost}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
            </View>

            <ModalRN
                isVisible={isShowModal}
                onRequestClose={() => setIsShowModal(false)}
            >
                {bookingDetail != null &&
                    <View style={modalStyles.container}>
                        <TouchableOpacity style={modalStyles.close_bg} onPress={() => setIsShowModal(false)}>
                            <EvilIcons name="close" size={40} color="black" />
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'white', marginHorizontal: 20 }}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '700' }}>Confirmed: Booking Receipt</Text>
                                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                    <Text style={{ fontSize: 18 }}>Guest: </Text>
                                    <Text style={{ fontSize: 18 }}>{bookingDetail.nameGuest}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                    <Text style={{ fontSize: 18 }}>Booking Date: </Text>
                                    <Text style={{ fontSize: 18 }}>{bookingDetail.bookingDate}</Text>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: '700', marginVertical: 5 }}>{bookingDetail.roomResponse.name}</Text>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={styles.titleDate}>Check-in</Text>
                                        <Text style={styles.titleDateData}>{dataFormat(bookingDetail.checkInDate)}</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={styles.titleDate}>Check-out</Text>
                                        <Text style={styles.titleDateData}>{dataFormat(bookingDetail.checkOutDate)}</Text>
                                    </View>
                                    <TouchableOpacity style={{ alignItems: "center" }}>
                                        <Text style={styles.titleDate}>Guests</Text>
                                        <Text style={styles.titleDateData}>{bookingDetail.guestCount} guests</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: 'white', flexDirection: 'column', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                                    <Text style={{ textTransform: 'uppercase' }}>Payment Detail</Text>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                                        <Text style={{ fontSize: 18 }}>${bookingDetail.roomResponse.price - 0 + (bookingDetail.guestCount > bookingDetail.roomResponse.minGuestCount ? (bookingDetail.guestCount - bookingDetail.roomResponse.minGuestCount) * bookingDetail.roomResponse.increasingPrice : 0)} x {countDays(bookingDetail.checkInDate, bookingDetail.checkOutDate)} nights</Text>
                                        <Text style={{ fontSize: 18 }}>{totalPrice(bookingDetail) - bookingDetail.roomResponse.serviceFee} $</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                                        <Text style={{ fontSize: 18 }}>Service</Text>
                                        <Text style={{ fontSize: 18 }}>{bookingDetail.roomResponse.serviceFee} $</Text>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 10, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 22 }}>Total</Text>
                                    <Text style={{ fontSize: 22 }}>{totalPrice(bookingDetail)}</Text>
                                </View>
                                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ height: 100, width: 200, backgroundColor: 'white' }}>
                                        <Image source={{ uri: "https://i.imgur.com/lv6PL0N.jpg" }}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>}
            </ModalRN>
        </ScrollView>
    );
}
var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 270,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    tagBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10,

        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        // elevation: 10,
    },
    titleDate: {
        fontSize: 16
    },
    titleDateData: {
        fontSize: 22,
        color: '#4d79ff'
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
        marginVertical: 5,
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