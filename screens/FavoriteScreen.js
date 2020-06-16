import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import RoomComponent from '../components/HomeComponent/RoomComponent';
import { DEFAULT_DATA_ROOM } from "../util/Util";
import { baseURL } from "../util/Util";
import AsyncStorage from '@react-native-community/async-storage';

export default FavoriteScreen = ({ navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const [favoriteData, setFavoriteData] = useState(null);

    async function getFavoriteRoomsByUser() {
        const USER_ID = await AsyncStorage.getItem('userId');

        try {
            const response = await fetch(baseURL + '/room/listFavorite?userId=' + USER_ID);
            const data = await response.json();
            setFavoriteData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getFavoriteRoomsByUser();
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            getFavoriteRoomsByUser();
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // do something
            getFavoriteRoomsByUser();
        });
        return unsubscribe;
    }, [navigation]);
    // useEffect(
    //     () => navigation.addListener('focus', () => getFavoriteRoomsByUser()),
    //     []
    // );
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{marginHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: '700'}}>Your Favorite Rooms</Text>
                        <TouchableOpacity style={{backgroundColor: '#80b3ff', paddingVertical: 5, paddingHorizontal: 10}}
                            onPress={() => getFavoriteRoomsByUser()}
                        >
                                <Text>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        favoriteData != null && favoriteData.length > 0 ? favoriteData.map((data, key) => {
                            return (
                                <View key={key}>
                                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                                        <Text style={{ fontSize: 22, fontWeight: '700' }}>{data.title}</Text>
                                    </View>
                                    <TouchableOpacity style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}
                                        onPress={() => navigation.navigate('DetailRoom', { idRoom: data.roomResponse.id })}
                                    >
                                        <RoomComponent data={data.roomResponse} plusFontSize={3} navigation={navigation} />
                                    </TouchableOpacity>
                                </View>
                            );
                        }) : <View style={{marginHorizontal: 20, marginTop: 10}}><Text>There are no favorite rooms</Text></View>
                    }
                </ScrollView>
            </View>
        </View>
    );
}