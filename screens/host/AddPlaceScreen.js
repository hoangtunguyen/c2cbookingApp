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

export default AddPlaceScreen = ({setIsShowModal}) => {
    const [photo, setPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');
    async function cloudinaryUpload(source) {
        try {
            var myHeader = new Headers();
            myHeader.append("Authorization", "Client-ID 565fdce260b5f64");
            var data = new FormData();
            data.append('image', source);

            let response = await fetch(
                'https://api.imgur.com/3/upload', {
                method: "POST",
                body: data,
                headers: myHeader
            }
            );
            let json = await response.json();
            console.log(json.data.link);
            setPhoto(json.data.link);
        } catch (error) {
            console.error(error);
        }
    }
    const selectPhotoTapped = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                const type = response.type;
                const name = response.fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUpload(response.data);

            }
        });
    };
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
                    <PropertyAndGuestComponent/>
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Location</Text>
                    <LocationComponent />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Amenities</Text>
                    <ListAmenityComponent />
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Photo</Text>
                    <View style={{ width: '100%', height: 300 }}>
                        <Image source={{ uri: photo }} style={{ flex: 1, width: null, height: null, resizeMode: "cover" }}></Image>
                    </View>
                    <View style={styles.uploadContainer}>
                        {/* <Text style={styles.uploadContainerTitle}>ImagePicker to Cloudinary</Text> */}
                        <TouchableOpacity onPress={selectPhotoTapped} style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Title</Text>
                    <Text style={{ fontSize: 20 }}>What is your place name?</Text>
                    <TextInput style={{ fontSize: 16 }} placeholder={'Input name of your place'}></TextInput>
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Decription</Text>
                    <Text style={{ fontSize: 20 }}>Decribe your place?</Text>
                    <TextInput style={{ fontSize: 16 }} placeholder={'Input name of your place'}></TextInput>
                </View>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Pricing</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Price of place</Text>
                        <TextInput style={{ fontSize: 18 }} placeholder={'20' + ' $'}></TextInput>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Service Fee</Text>
                        <TextInput style={{ fontSize: 18 }} placeholder={'20' + ' $'}></TextInput>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Fee of increasing guest</Text>
                        <TextInput style={{ fontSize: 18 }} placeholder={'20' + ' $'}></TextInput>
                    </View>
                </View>
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