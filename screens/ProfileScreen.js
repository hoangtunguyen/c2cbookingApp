import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default ProfileScreen = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.linearGradient}>
                <View style={{ height: 130, width: 130, backgroundColor: 'transparent' }}>
                    <Image source={{ uri: 'https://i.imgur.com/AJhukbs.jpg' }}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100 }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 22 }}>Nguyen Hoang Tu</Text>
                </View>
            </LinearGradient>
            <View style={{ backgroundColor: 'transparent', marginHorizontal: 20 }}>
                <Text style={{fontWeight: '700', fontSize: 22}}>Lastest Booking</Text>
                <TouchableOpacity style={styles.tagBox}>
                    <View style={{ flex: 2, padding: 5, backgroundColor: '#48c6ef', borderRadius: 20, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '600' }}>DA NANG</Text>
                    </View>
                    <View style={{ flex: 7, backgroundColor: 'white', justifyContent: 'center', borderRadius: 20, paddingHorizontal: 5 }}>
                        <Text style={{ fontSize: 18 }}>Louis bdl, full house in downtown</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>$210</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tagBox}>
                    <View style={{ flex: 2, padding: 5, backgroundColor: '#ff7eb3', borderRadius: 20, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '600' }}>VINH</Text>
                    </View>
                    <View style={{ flex: 7, backgroundColor: 'white', justifyContent: 'center', borderRadius: 20, paddingHorizontal: 5 }}>
                        <Text style={{ fontSize: 18 }}>Chestnut 4 - 3 minute walk to Dragon Bridge</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>$180</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}
var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 270,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    tagBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 10,

        borderRadius: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        // elevation: 10,
    },
});