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



export default LocationComponent = () => {
    const [cityData, setCityData] = useState([]);
    const [queryCity, setQueryCity] = useState('');
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
    useEffect(() => {
        getAllCity();
    }, []);
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 20 }}>City</Text>
                <Picker
                    selectedValue={queryCity == null ? '' : queryCity}
                    style={{ height: 60, width: 200}}
                    onValueChange={(idCity, itemIndex) =>
                        setQueryCity(idCity)
                    }>
                   { cityData != null && cityData.map((data, index) => {
                       return (
                        <Picker.Item key={index} label={data.cityName} value={data.id} />
                       );
                   }) }
                </Picker>
            </View>
            <View>
                <Text style={{ fontSize: 20 }}>Address</Text>
                <TextInput style={{ fontSize: 16 }} placeholder={'50 Nguyen Phuoc Thai, Thanh Khe'}></TextInput>
            </View>
        </View>
    );
}
