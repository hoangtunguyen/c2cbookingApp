import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5ICon from 'react-native-vector-icons/FontAwesome5';
import { baseURL, addOrDeleteFavorite } from "../../util/Util";

export default Room = ({navigation, plusFontSize, data }) => {
    const DOLLAR_SIGN = '\u0024'
    const [isFavorite, setIsFavorite] = useState(null);
    const idRoomCon = data.id;
    async function isFavoriteFc(userId, roomId) {
        try {
            const response = await fetch(baseURL + '/room/isFavorite?userId=' + userId+'&roomId='+roomId);
            const data = await response.json();
            if(data.data){
                setIsFavorite(true);
            }else{
                setIsFavorite(false);
            }
            // console.log(data.data);
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('room'+data.id);
        console.log(data.name);
        isFavoriteFc(1, data.id);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do something
          console.log('room'+data.id);
          console.log(data.name);

          isFavoriteFc(1, data.id);
        });
        return unsubscribe;
      }, [navigation]);
    plusFontSize = plusFontSize == undefined ? 0 : plusFontSize;
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: data.urlImage }}
                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10 }} />
                <TouchableOpacity style={{position: 'absolute', right: 10, top : 10}}
                 onPress={() => addOrDeleteFavorite({title: data.name, roomId: data.id, userId: 1}, setIsFavorite)}
                >
                    <Icon name="gratipay" size={30 + plusFontSize * 4} color={isFavorite ? "red" : "white"} />
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 5, }}>
                    <TouchableOpacity style={{ backgroundColor: "#80b3ff", borderRadius: 5, paddingHorizontal: 10, paddingVertical: 3 }}>
                        <Text style={{ fontSize: 11 + plusFontSize, fontWeight: "500", textTransform: "uppercase" }}>{data.categoryRoom}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                        <Icon name="star" size={20} color="black" />
                        <Text style={{ fontSize: 16 + plusFontSize }}> {data.rating} ({data.votedCount})</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18 + plusFontSize, }}>{data.name}</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={{ fontSize: 18 + plusFontSize, fontWeight: '700' }}>{DOLLAR_SIGN}{data.price}</Text>
                    <Text style={{ fontSize: 18 + plusFontSize }}> /night</Text>
                </View>
            </View>
        </View>

    );
}