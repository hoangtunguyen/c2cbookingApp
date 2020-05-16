import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import ModalRN from 'react-native-modal';
import InputSpinner from "react-native-input-spinner";

export default PaymentScreen = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [guests, setGuest] = useState(2);
    const maxGuest = 6;
    const minGuest = 2;
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [isShowModal, setIsShowModal] = useState(false);
    const [ipServer, setIpServer] = useState(null);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('IP_SERVER')
            if (value !== null) {
                // value previously stored
                setIpServer(value);
                console.log(value);
            }
        } catch (e) {
            // error reading value
        }
    }
    function handleCheckoutData(data) {
        if (data.title == "success") {
            setIsShowModal(false);

        }
    };
    useEffect(() => {
        getData();
        console.log("didmount");
    }, [])
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
                    <View style={{flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginTop: 20, borderTopWidth: 0.2, paddingVertical: 15}}>
                        <TouchableOpacity style={{backgroundColor: '#40c5f4', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15}}
                        onPress={() => toggleModal()}
                        >
                            <Text style={{fontSize: 16}}>Close</Text>
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
                        <Text style={{ fontWeight: '100', fontSize: 20, textTransform: 'uppercase' }}>Entire Flat</Text>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>$12 / night</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <Icon name="star" size={18} color="#4d79ff" />
                            <Text style={{ fontSize: 16, color: '#4d79ff' }}> 4.9 (143)</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, height: 100, backgroundColor: 'white', alignItems: 'flex-end' }}>
                        <Image source={{ uri: 'https://pix6.agoda.net/hotelImages/4656079/-1/f7771c6afc7cc32401286116a7eed6f0.jpg' }}
                            style={{ flex: 1, width: 150, height: null, resizeMode: 'cover' }} />
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.titleDate}>Check-in</Text>
                        <Text style={styles.titleDateData}>4 Jul</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.titleDate}>Check-out</Text>
                        <Text style={styles.titleDateData}>14 Jul</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: "center" }} onPress={toggleModal}>
                        <Text style={styles.titleDate}>Guests</Text>
                        <Text style={styles.titleDateData}>{guests} guests</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'column', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                    <Text style={{ textTransform: 'uppercase' }}>Tax && Fee Detail</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>$20 x 9 nights</Text>
                        <Text style={{ fontSize: 18 }}>180 $</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>Service</Text>
                        <Text style={{ fontSize: 18 }}>20 $</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>Tax * 10%</Text>
                        <Text style={{ fontSize: 18 }}>18 $</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingVertical: 15, borderTopWidth: 0.5, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 22 }}>Total</Text>
                    <Text style={{ fontSize: 22 }}>218 $</Text>
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
                <WebView source={{ uri: 'http://' + ipServer + ':8080/home' }}
                    onNavigationStateChange={(data) => handleCheckoutData(data)}
                    injectedJavaScript={`document.checkoutForm.submit()`} />
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