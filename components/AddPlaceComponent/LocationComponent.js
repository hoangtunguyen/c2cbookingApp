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
import { Picker } from '@react-native-community/picker';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps



export default LocationComponent = ({ setFormRequest }) => {
    const [cityData, setCityData] = useState([]);
    const DEAULT_COORDINATE = {
        "lat": 16.068264,
        "lng": 108.218894,
    }
    const [location, setLocation] = useState({
        "lat": DEAULT_COORDINATE.lat,
        "lng": DEAULT_COORDINATE.lng,
        "street": "50 Nguyen Phuoc Thai",
        "cityId": 1
    });

    async function getAllCity() {
        try {
            const response = await fetch(baseURL + '/city/viewAll');
            const data = await response.json();
            setCityData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    const setLocationData = (obj) => {
        setLocation((pre) => {
            return {
                ...pre,
                ...obj
            }
        })
    }
    useEffect(() => {
        getAllCity();
    }, []);
    useEffect(() => {
        setFormRequest((pre) => {
            return {
                ...pre,
                "location": location
            }
        })
    }, [location]);
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20 }}>City</Text>
                <Picker
                    selectedValue={location.cityId == null ? '' : location.cityId}
                    style={{ height: 60, width: 200 }}
                    onValueChange={(idCity, itemIndex) =>
                        setLocationData({ "cityId": idCity })
                    }>
                    {cityData != null && cityData.map((data, index) => {
                        return (
                            <Picker.Item key={index} label={data.cityName} value={data.id} />
                        );
                    })}
                </Picker>
            </View>
            <View>
                <Text style={{ fontSize: 20 }}>Address</Text>
                <TextInput
                    onChangeText={(text) => { setLocationData({ "street": text }) }}
                    style={{ fontSize: 16 }} placeholder={'50 Nguyen Phuoc Thai, Thanh Khe'}></TextInput>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: DEAULT_COORDINATE.lat - 0,
                        longitude: DEAULT_COORDINATE.lng - 0,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    onPress={(data) => setLocationData({ "lat": data.nativeEvent.coordinate.latitude, "lng": data.nativeEvent.coordinate.longitude })}
                >

                    <MapView.Marker
                        coordinate={{
                            latitude: location.lat - 0,
                            longitude: location.lng - 0
                        }}
                    // title={"tu"}
                    // description={3 + "$/ Night"}
                    />
                </MapView>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        height: 400,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});