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
import { baseURL } from "../../util/Util";
import CheckBox from 'react-native-check-box'
import InputSpinner from "react-native-input-spinner";
export default PropertyAndGuestComponent = () => {
    const [propertyRequest, setPropertyRequest] = useState({roomTypeId: null });

    const [dataRoomType, setDataRoomType] = useState(null);
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
    useEffect(() => {
        getDataRoomType();
    }, [])
    return (
        <View style={{paddingRight: 0}}>
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
                                        setPropertyRequest({ ...propertyRequest, roomTypeId: data.id });
                                    }}
                                    isChecked={propertyRequest["roomTypeId"] != null && data.id == propertyRequest["roomTypeId"] ? true : false}
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
    );
}