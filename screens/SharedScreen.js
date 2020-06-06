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
import { baseURL } from "../util/Util";
import CheckBox from 'react-native-check-box'
import InputSpinner from "react-native-input-spinner";
import ListAmenityComponent from "../components/AddPlaceComponent/ListAmenityComponent";
import LocationComponent from "../components/AddPlaceComponent/LocationComponent";

export default SharedScreen = () => {
    const [dataRoomType, setDataRoomType] = useState(null);
    const [photo, setPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');
    const [roomRequest, setRoomRequest] = useState({ name: null, roomTypeId: null });
    async function getDataRoomType() {
        try {
            const response = await fetch(baseURL + '/roomType/viewAll');
            const data = await response.json();
            setDataRoomType(data);
        }
        catch (error) {
            console.error(error);
        }
    };
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
    useEffect(() => {
        getDataRoomType();
    }, [])
    return (
        <ScrollView sty>
            <View style={{ backgroundColor: '#008489', height: 130, justifyContent: 'center', paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontSize: 30, fontWeight: '700' }}>Let's set up your listing</Text>
            </View>
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.boxItem}>
                    <Text style={styles.textItem}>Property and guests</Text>

                    <View>
                        <Text style={{ fontSize: 20 }}>What will guests book?</Text>
                        <View>

                            {
                                dataRoomType != null && dataRoomType.length > 0 && dataRoomType.map((data, key) => {
                                    return (
                                        <CheckBox
                                            key={key}
                                            style={{ flex: 1, paddingVertical: 15 }}
                                            onClick={() => {
                                                setRoomRequest({ ...roomRequest, roomTypeId: data.id });
                                                console.log(roomRequest);
                                            }}
                                            isChecked={roomRequest["roomTypeId"] != null && data.id == roomRequest["roomTypeId"] ? true : false}
                                            leftText={data.typename}
                                            leftTextStyle={{ fontSize: 18 }}

                                        />
                                    )
                                })
                            }


                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20 }}>How many guests can stays?</Text>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>Number of guests: </Text>
                            </View>
                            <InputSpinner
                                max={5}
                                min={2}
                                step={1}
                                colorMax={"#f04048"}
                                colorMin={"#40c5f4"}
                                value={1}
                                // onChange={(num) => {
                                //     setGuest(num);
                                // }}
                                width={150}
                                height={40}
                                fontSize={18}
                            />
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>Guest Bedrooms</Text>
                            </View>
                            <InputSpinner
                                max={5}
                                min={2}
                                step={1}
                                colorMax={"#f04048"}
                                colorMin={"#40c5f4"}
                                value={1}
                                // onChange={(num) => {
                                //     setGuest(num);
                                // }}
                                width={150}
                                height={40}
                                fontSize={18}
                            />
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>Beds for guests </Text>
                            </View>
                            <InputSpinner
                                max={5}
                                min={2}
                                step={1}
                                colorMax={"#f04048"}
                                colorMin={"#40c5f4"}
                                value={1}
                                // onChange={(num) => {
                                //     setGuest(num);
                                // }}
                                width={150}
                                height={40}
                                fontSize={18}
                            />
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>Bedrooms for guests </Text>
                            </View>
                            <InputSpinner
                                max={5}
                                min={2}
                                step={1}
                                colorMax={"#f04048"}
                                colorMin={"#40c5f4"}
                                value={1}
                                // onChange={(num) => {
                                //     setGuest(num);
                                // }}
                                width={150}
                                height={40}
                                fontSize={18}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20 }}>The minimunm of guests?</Text>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>Guests (At least) </Text>
                            </View>
                            <InputSpinner
                                max={5}
                                min={2}
                                step={1}
                                colorMax={"#f04048"}
                                colorMin={"#40c5f4"}
                                value={1}
                                // onChange={(num) => {
                                //     setGuest(num);
                                // }}
                                width={150}
                                height={40}
                                fontSize={18}
                            />
                        </View>
                    </View>
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