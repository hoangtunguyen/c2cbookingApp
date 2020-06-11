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



export default LocationComponent = ({ setFormRequest }) => {
    const [cityData, setCityData] = useState([]);
    const [queryCity, setQueryCity] = useState('');
    const [location, setLocation] = useState({
        "lat": "23.2222",
        "lng": "23.3333",
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
    const setLocationData= (obj)=>{
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
                        // setQueryCity(idCity)
                        setLocationData({"cityId" : idCity})
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
                    onChangeText= {(text) => {setLocationData({"street" : text})}}
                    style={{ fontSize: 16 }} placeholder={'50 Nguyen Phuoc Thai, Thanh Khe'}></TextInput>
            </View>
        </View>
    );
}
