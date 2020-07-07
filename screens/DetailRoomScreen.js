import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AmenitiesComponent from "../components/OtherComponent/AmenitiesComponent";
import MapComponent from "../components/OtherComponent/MapComponent";
import { baseURL, addOrDeleteFavorite } from "../util/Util";
import AsyncStorage from '@react-native-community/async-storage';

export default DetailRoomScreen = ({ navigation, route }) => {
    const DOLLAR_SIGN = '\u0024';
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [detailData, setDetailData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(null);

    async function getDetailRoom(idRoom) {
        try {
            const response = await fetch(baseURL + '/room/detail/' + idRoom);
            const data = await response.json();
            setDetailData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    async function isFavoriteFc(roomId) {
        const USER_ID = await AsyncStorage.getItem('userId');
        try {
            const response = await fetch(baseURL + '/room/isFavorite?userId=' + USER_ID + '&roomId=' + roomId);
            const data = await response.json();
            if (data.data) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
            // console.log(data.data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        let idRoom = route.params["idRoom"];
        getDetailRoom(idRoom);
        isFavoriteFc(idRoom);
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {
                detailData != null && (
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ backgroundColor: 'white' }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: detailData.urlImage }}
                                    style={{ flex: 1, width: screenWidth, height: 233, resizeMode: 'cover' }} />
                                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }}
                                    onPress={() => addOrDeleteFavorite({ title: detailData.name, roomId: detailData.id }, setIsFavorite)}
                                >
                                    <Icon name="gratipay" size={50} color={isFavorite ? "red" : "white"} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 30, fontWeight: '700' }}>{detailData.name}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 20, fontWeight: '700'}}>Host:  </Text>
                                    <Text style={{fontSize: 20}}>{detailData.ownerName}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                                    <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 3 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "500", textTransform: "uppercase" }}>{detailData.typeRoom}</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', marginLeft: 20 }}>
                                        <Icon name="star" size={20} color="black" />
                                        <Text style={{ fontSize: 18 }}> {detailData.rating} ({detailData.votedCount})</Text>
                                    </View>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: '300' }}>{detailData.address}</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 15, }}>
                                    <Text style={{ fontSize: 18, paddingRight: 10 }}>{detailData.bedroomCount} bedrooms</Text>
                                    <Text style={{ fontSize: 18, paddingRight: 10 }}>{detailData.bedCount} beds</Text>
                                    <Text style={{ fontSize: 18, paddingRight: 10 }}>{detailData.bathroomCount} bathrooms</Text>
                                    <Text style={{ fontSize: 18, paddingRight: 10 }}>{detailData.guestCount} guests</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 22, fontWeight: '700' }}>Amenities</Text>
                                    <View style={{ backgroundColor: 'white', flexDirection: 'column', flexWrap: 'wrap', marginTop: 10 }}>
                                        {detailData.amenityResponseList.map((data, index) => {
                                            return (
                                                <AmenitiesComponent key={index} data={data} />
                                            );
                                        })}
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 22, fontWeight: '700' }}>Location</Text>
                                    <View style={{ backgroundColor: 'white', height: 200, marginRight: 20 }}>
                                        <MapComponent data={detailData} />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', borderWidth: 0.4, height: 60, backgroundColor: 'white', alignItems: "center", justifyContent: 'space-between', paddingHorizontal: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 22, fontWeight: '700' }}>{DOLLAR_SIGN}{detailData.price}</Text>
                                <Text style={{ fontSize: 22 }}> /night</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}
                                onPress={() => (navigation.navigate('Calendar', { data: detailData }))}>
                                <Text style={{ fontSize: 22, fontWeight: "400", }}>Check Availibility</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </View>
    );
}