import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { baseURL } from "../..//util/Util";
import AmenitiesComponent from "../OtherComponent/AmenitiesComponent";
import { ScrollView } from 'react-native-gesture-handler';

export default ListAmenityComponent = () => {
    const [amenityData, setAmenityData] = useState(null);
    const [listId, setListId] = useState([]);
    async function getAllAmenity() {
        try {
            const response = await fetch(baseURL + '/amenity/viewAll');
            const data = await response.json();
            setAmenityData(data);
        }
        catch (error) {
            console.error(error);
        }
    };
    const isAddAmenity = (id) =>{
            if(listId.includes(id)) return true;
            return false; 
            
    }
    useEffect(() => {
        getAllAmenity();
    }, []);
    const addAmenityId = (id) => {
        setListId((previous) => {
            if(previous.includes(id)){      
                return [
                    ...previous.filter(val => val != id)
                ];
            }
            else{
                previous.push(id);
                return [
                    ...previous
                ];
            }
        });
    }
    return (
        <View>
            <View style={{ backgroundColor: 'white', flexWrap: 'wrap', marginTop: 10}}>
                {amenityData != null && amenityData.map((data, index) => {
                    return (
                        <TouchableOpacity key={index} style={{ height: 50, marginBottom: 10, flexDirection: 'row', alignItems: "center", borderRadius: 10, backgroundColor: listId.includes(data.id) ? '#79d2a6' : 'white' }}
                            onPress={() => addAmenityId(data.id)}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18 }}>{data['name']}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Image source={{ uri: data.iconUrl }}
                                    style={{ width: 35, height: 35, marginRight: 20 }} />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}