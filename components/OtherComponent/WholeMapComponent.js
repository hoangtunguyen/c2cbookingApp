import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Carousel from 'react-native-snap-carousel';
import CarouselComponent from "../OtherComponent/CarouselComponent";
export default ({ navigation, route }) => {
    const image = { uri: "https://blog.rever.vn/hubfs/ta-van-riverside-homestay.jpg" };
    const [coordinate, setCoordinate] = useState([
        { title: "Louis bdl, full house in down town", latitude: 37.79045, longitude: -122.4324, description: "30$/ Night", image: 'https://blog.rever.vn/hubfs/ta-van-riverside-homestay.jpg' },
        { title: "Havana beautiful home", latitude: 37.78245, longitude: -122.4324, description: "20$/ Night", image: 'https://pix6.agoda.net/hotelImages/4656079/-1/f7771c6afc7cc32401286116a7eed6f0.jpg' },
        { title: "Happy Home", latitude: 37.78245, longitude: -122.4344, description: "35$/ Night", image: 'https://blog.rever.vn/hubfs/ta-van-riverside-homestay.jpg' },

    ]);
    const [dataRoom, setDataRoom] = useState(route.params["roomData"]);
    const [carousel, setCarousel] = useState(null);
    const [map, setMap] = useState(null);
    var markerArr = [];
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                backgroundColor: 'floralwhite',
                flexDirection: 'row',
                borderRadius: 20,
                height: '100%',
                paddingHorizontal: 0,
            }}
            onPress={()=> {
                navigation.navigate('DetailRoom', {idRoom : item.id});
            }}
            >

                <View style={{ flex: 3 }}>
                    <Image source={{ uri: item.urlImage }}
                        style={styles.image} />
                </View>
                <View style={{ flex: 5, justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 18, }}>{item.name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>{item.price} $/night</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Icon name="star" size={20} color="red" />
                        <Text style={{ fontSize: 18 }}> {item.rating} ({item.votedCount})</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const _onCarouselItemChange = (index) =>{
        let location = dataRoom[index];
        map.animateToRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
          });
        markerArr[index].showCallout();
    }

    const onMarkerPressed = (data, index) => {
        carousel.snapToItem(index);
    };
    const updateRefMarker = (ref, index) =>{
        markerArr[index] = ref;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={modalStyles.close_bg}>
                <EvilIcons name="close" size={40} color="black" />
            </TouchableOpacity>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                ref={map => setMap(map)}
                region={{
                    latitude: dataRoom[0].lat,
                    longitude: dataRoom[0].lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onPress={ (event) => console.log(event.nativeEvent.coordinate) }
            >

                {
                    dataRoom.map((marker, index) => {
                        return (
                            <MapView.Marker
                                key={index}
                                ref={ref => updateRefMarker(ref, index)}
                                coordinate={{
                                    latitude: marker.lat,
                                    longitude: marker.lng
                                }}
                                onPress={() => onMarkerPressed(marker, index)}
                                title={marker.name}
                                description={marker.price + "$/night"}
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
                    data={dataRoom}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={350}
                    onSnapToItem={(index) => _onCarouselItemChange(index)}
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
