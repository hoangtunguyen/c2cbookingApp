import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Button, Dimensions, StyleSheet } from 'react-native';
import Search from "../components/HomeComponent/SearchComponent";
import RoomComponent from '../components/HomeComponent/RoomComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <TouchableOpacity style={styles.mapView}>
                <Icon name="map-marker" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    mapView: {
        position: "absolute",
        bottom: 15,
        right: 10,
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',

        // shadow custom
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 15,
    }
})
