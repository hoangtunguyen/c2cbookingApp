import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default AmenitiesComponent = ({ data }) => {
    const [urlImage, setUrlImage] = useState(null);

    
    return (
        <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: "center" }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{data['name']}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row-reverse'}}>
                <Image source={{uri: data.iconUrl} }
                    style={{ width: 35, height: 35, marginRight: 20 }} />
            </View>
        </TouchableOpacity>
    );
}