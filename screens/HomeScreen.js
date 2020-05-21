import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Button } from 'react-native';
import Search from "../components/HomeComponent/SearchComponent";
import Category from "../components/HomeComponent/CategotyComponent";
import Room from "../components/HomeComponent/RoomComponent";
import { baseURL } from "../util/Util";
export default HomeScreen = ({ navigation }) => {
    const [favoriteRoomsData, setFavoriteRoomsData] = useState(null);
    const [dataRoom, setDataRoom] = useState(null);
    async function getFavoriteRooms() {
        try {
            const response = await fetch(baseURL+'/room/favorite/5');
            const data = await response.json();
            setFavoriteRoomsData(data);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFavoriteRooms();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Search setData={setDataRoom} />

                <ScrollView style={{}}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <View style={{ marginTop: 5, backgroundColor: 'white' }}>
                            <View style={{ marginLeft: 20, marginBottom: 10 }}>
                                <Text style={{ fontSize: 22, fontWeight: '700' }}>What type do you want ?</Text>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Category url="https://i.imgur.com/vKwjc4K.jpg" title="Entire Room" />
                                <Category url="https://i0.wp.com/puluongecogarden.com/wp-content/uploads/private-room-onstilt-house-1068x674.jpg" title="Private Room" />
                                <Category url="https://freshome.com/wp-content/uploads/2016/03/freshome-shared-bedroom-1.png" title="Shared Room" />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ flex: 1, paddingTop: 20, backgroundColor: 'white' }}>
                        <View style={{ marginLeft: 20, marginBottom: 10 }}>
                            <Text style={{ fontSize: 22, fontWeight: '700' }}>Favorite Rooms</Text>
                        </View>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingLeft: 20, marginRight: 10 }}
                        >
                            {
                                favoriteRoomsData != null && favoriteRoomsData.map((data, index) => {
                                    return (
                                        <TouchableOpacity style={{ width: 230, height: 240, backgroundColor: 'red', marginRight: 15 }}
                                            key={index}
                                            onPress={() => navigation.navigate('DetailRoom', {idRoom : data.id})}>
                                            <Room data={data}/>
                                        </TouchableOpacity>
                                    );
                                })
                            }



                        </ScrollView>
                        <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 3, width: 330, marginLeft: 20, paddingVertical: 10, alignItems: 'center', marginVertical: 15 }}
                            onPress={() => navigation.navigate("ShowAllRooms")}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "700", textTransform: "uppercase" }}>Show All Stays</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}