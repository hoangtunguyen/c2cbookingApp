import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { baseURL } from "../../util/Util";
import ModalRN from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-community/async-storage';

export default ProfileHostScreen = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [profile, setProfile] = useState(null);

    const toggleSwitch = () => {
        // setIsEnabled(previousState => !previousState);
        navigation.navigate('Home');
    };
    async function getProfile() {
        const USER_ID = await AsyncStorage.getItem('userId');
        try {
            const response = await fetch(baseURL + '/profile?id=' + USER_ID);
            const data = await response.json();
            setProfile(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <ScrollView>
            <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.linearGradient}>
                {
                    profile != null && <View>
                        <View style={{ height: 130, width: 130, backgroundColor: 'transparent' }}>
                            <Image source={{ uri: profile.urlImage }}
                                style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 100 }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 22, textAlign: 'center' }}>{profile.userName}</Text>
                        </View>
                    </View>
                }
            </LinearGradient>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 22 }}>Switch to Guest</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }] }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>


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
    }
})