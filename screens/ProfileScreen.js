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
                <View style={{marginTop: 10}}>
                    <Text style={{fontSize: 22}}>Nguyen Hoang Tu</Text>
                </View>
            </LinearGradient>

        </ScrollView>
    );
}
var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 330,
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
});