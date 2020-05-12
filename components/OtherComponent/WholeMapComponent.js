import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Carousel from 'react-native-snap-carousel';
import CarouselComponent from "../OtherComponent/CarouselComponent";
export default ({ navigation, setIsShowModal }) => {
    const image = { uri: "https://blog.rever.vn/hubfs/ta-van-riverside-homestay.jpg" };
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                backgroundColor: 'floralwhite',
                flexDirection: 'row',
                borderRadius: 20,
                height: '100%',
                paddingHorizontal: 0,


            }}>

                <View style={{ flex: 3 }}>
                    <Image source={{ uri: item.image }}
                        style={styles.image} />
                </View>
                <View style={{ flex: 5, justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 18, }}>{item.title}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>{item.description}</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', marginTop: 10}}>
                        <Icon name="star" size={20} color="red" />
                        <Text style={{ fontSize: 18 }}> 4.9 (102)</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const [coordinate, setCoordinate] = useState([
        { title: "Louis bdl, full house in down town", latitude: 37.79045, longitude: -122.4324, description: "30$/ Night", image: 'https://blog.rever.vn/hubfs/ta-van-riverside-homestay.jpg' },
        { title: "Havana beautiful home", latitude: 37.78245, longitude: -122.4324, description: "20$/ Night", image: 'https://pix6.agoda.net/hotelImages/4656079/-1/f7771c6afc7cc32401286116a7eed6f0.jpg' },
        { title: "Happy Home", latitude: 37.78245, longitude: -122.4344, description: "35$/ Night", image: 'https://blog.rever.vn/hubfs/ta-van-riverside-homestay.jpg' },

    ]);
    const [carousel, setCarousel] = useState(null);
    const onMarkerPressed = (data, index) => {
        carousel.snapToItem(index);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={modalStyles.close_bg} onPress={() => setIsShowModal(false)}>
                <EvilIcons name="close" size={40} color="black" />
            </TouchableOpacity>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

                {
                    coordinate.map((marker, index) => {
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                                onPress={() => onMarkerPressed(marker, index)}
                                title={marker.title}
                                description={marker.description}
                            />
                        )
                    })
                }
            </MapView>
            <View style={{ position: 'absolute', bottom: 20, height: 150, width: '100%', backgroundColor: 'transparent' }}>
                {/* <CarouselComponent/> */}

                <Carousel
                    layout={'default'}
                    ref={(c) => { setCarousel(c) }}
                    data={coordinate}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={350}
                />
            </View>

        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // ...StyleSheet.absoluteFillObject,
        // height: null,
        // width: null,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        borderRadius: 20
    },
});
const modalStyles = StyleSheet.create({
    close_bg: {
        position: 'absolute',
        top: 20,
        left: 15,
        backgroundColor: 'white',
        zIndex: 1,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
