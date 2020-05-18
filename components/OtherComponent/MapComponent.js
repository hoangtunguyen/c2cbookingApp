import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
export default ({data}) => (
    <View style={styles.container}>
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: data.lat - 0,
                longitude: data.lng - 0,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >

            <MapView.Marker
                coordinate={{
                    latitude: data.lat - 0,
                    longitude: data.lng - 0
                }}
                title={data.name}
                description={data.price+"$/ Night"}
            />
        </MapView>
    </View>
);
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});