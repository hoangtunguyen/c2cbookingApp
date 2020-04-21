import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Button, Dimensions } from 'react-native';
import Search from "../components/HomeComponent/SearchComponent";
import RoomComponent from '../components/HomeComponent/RoomComponent';
export default ShowAllRoomsScreen = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Search />
                <ScrollView>
                    <View style={{ marginLeft: 20, marginBottom: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>Show more 100+ stays</Text>
                    </View>
                    <View style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}>
                        <RoomComponent plusFontSize={3} />
                    </View>
                    <View style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}>
                        <RoomComponent plusFontSize={3} />
                    </View>
                    <View style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}>
                        <RoomComponent plusFontSize={3} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}