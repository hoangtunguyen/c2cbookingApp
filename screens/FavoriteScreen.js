import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import RoomComponent from '../components/HomeComponent/RoomComponent';

export default FavoriteScreen = ({ navigation }) => {
    const screenWidth = Math.round(Dimensions.get('window').width);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>Beautiful house</Text>
                    </View>
                    <TouchableOpacity style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}
                        onPress={() => navigation.navigate('DetailRoom')}
                    >
                        <RoomComponent plusFontSize={3} />
                    </TouchableOpacity>


                    <View style={{ marginLeft: 20, marginTop: 10 }}>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>Amazing apartment</Text>
                    </View>
                    <TouchableOpacity style={{ width: screenWidth, height: 270, paddingHorizontal: 20, marginVertical: 15 }}
                        onPress={() => navigation.navigate('DetailRoom')}
                    >
                        <RoomComponent plusFontSize={3} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}