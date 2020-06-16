import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView, TextInput
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { baseURL } from "../../util/Util";
import CheckBox from 'react-native-check-box'
import InputSpinner from "react-native-input-spinner";

import ListAmenityComponent from "../../components/AddPlaceComponent/ListAmenityComponent";
import LocationComponent from "../../components/AddPlaceComponent/LocationComponent";
import PropertyAndGuestComponent from "../../components/AddPlaceComponent/PropertyAndGuestComponent";
import UploadImageComponent from "../../components/AddPlaceComponent/UploadImageComponent";
import Toast from 'react-native-simple-toast';

export default AddPlaceScreen = ({ setIsShowModal, formData }) => {
    // console.log(formData);
    const [formRequest, setFormRequest] = useState(
        formData
    );
    const setObjJson = (obj) => {
        setFormRequest((pre) => {
            return {
                ...pre,
                ...obj
            }
        })
    }
    async function addRoom(request) {
        try {
            const response = await fetch(baseURL + '/host/addRoom', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            if (response.status == 200) {
                if(formRequest.roomId != null){
                    Toast.show('Room has updated, please check again', Toast.LONG);
                }else{
                    Toast.show('Room has added to your list places.', Toast.LONG);

                }

                setIsShowModal(false);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(formRequest);
    }, [formRequest]);
    return (
        <ScrollView sty>
            <View style={{ backgroundColor: '#008489', height: 130, justifyContent: 'center', paddingLeft: 20 }}>
                <TouchableOpacity onPress={() => setIsShowModal(false)}>
                    <AntDesign name="close" size={35} color="white" />
                </TouchableOpacity>

                <Text style={{ color: 'white', fontSize: 30, fontWeight: '700' }}>Let's set up your listing</Text>
            </View>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Property and guests</Text>
                    <PropertyAndGuestComponent setFormRequest={setFormRequest} formRequest={formRequest} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Location</Text>
                    <LocationComponent setFormRequest={setFormRequest} formRequest={formRequest} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Amenities</Text>
                    <ListAmenityComponent setFormRequest={setFormRequest} formRequest={formRequest} />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Photo</Text>
                    <UploadImageComponent setFormRequest={setFormRequest} formRequest={formRequest} />

                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Title</Text>
                    <Text style={{ fontSize: 20 }}>What is your place name?</Text>
                    <TextInput
                        onChangeText={(text) => { setObjJson({ "roomName": text }) }}
                        style={{ fontSize: 16 }} placeholder={'Input name of your place'}>{formRequest.roomName}</TextInput>
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Decription</Text>
                    <Text style={{ fontSize: 20 }}>Decribe your place?</Text>
                    <TextInput
                        onChangeText={(text) => { setObjJson({ "description": text }) }}
                        style={{ fontSize: 16 }} placeholder={'Input name of your place'}>{formRequest.description}</TextInput>
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Pricing</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Price of place</Text>
                        <TextInput
                            onChangeText={(val) => { setObjJson({ "price": +val }) }}
                            style={{ fontSize: 18 }} placeholder={'20' + ' $'}>{formRequest.price == 0 ? '' : formRequest.price}</TextInput>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Service Fee</Text>
                        <TextInput
                            onChangeText={(val) => { setObjJson({ "serviceFee": +val }) }}
                            style={{ fontSize: 18 }} placeholder={'20' + ' $'}>{formRequest.serviceFee == 0 ? '' : formRequest.serviceFee}</TextInput>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Fee of increasing guest</Text>
                        <TextInput
                            onChangeText={(val) => { setObjJson({ "feeIncreasingPerson": +val }) }}
                            style={{ fontSize: 18 }} placeholder={'20' + ' $'}>{formRequest.feeIncreasingPerson == 0 ? '' : formRequest.feeIncreasingPerson}</TextInput>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => addRoom(formRequest)}
                    style={{ backgroundColor: '#008489', alignItems: 'center', marginHorizontal: 50, marginVertical: 20, padding: 20, borderRadius: 30 }}>
                    <Text style={{ fontSize: 22, fontWeight: '700', color: 'white' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    boxItem: {
        paddingVertical: 15,
        borderTopWidth: 0.3,
        // borderBottomWidth: 0.5,
        marginTop: 5,
        paddingHorizontal: 20

    },
    textItem: {
        fontSize: 20,
        fontWeight: '700'
    },
    uploadContainer: {

    },
    uploadButton: {
        borderRadius: 16,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 5,
        },
        shadowOpacity: 1.58,
        shadowRadius: 9,
        elevation: 4,
        margin: 10,
        padding: 10,
        backgroundColor: '#fe5b29',
        width: 300,
        alignItems: 'center'
    },
    uploadButtonText: {
        color: '#f6f5f8',
        fontSize: 20,
        fontFamily: 'Roboto'
    }



});