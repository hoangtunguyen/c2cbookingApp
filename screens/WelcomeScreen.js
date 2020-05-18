import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default WelcomeScreen = ({navigation}) => {
    const [ipServer, setIpServer] = useState('192.168.1.7');

    const storeData = async () => {
        try {
          await AsyncStorage.setItem('IP_SERVER', ipServer);
        //   getData();
        navigation.navigate('Home')
        } catch (e) {
          // saving error
        }
      };
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TextInput style={{height: 50, width: 300, backgroundColor: 'white', fontSize: 22}}
             placeholder="Search"
             onChangeText={(val) => setIpServer(val)}
             >{ipServer}</TextInput>
             <Text>{ipServer}</Text>
            <TouchableOpacity style={{marginTop: 20, padding: 30, backgroundColor: 'yellow', borderRadius: 20}}
            onPress={() => storeData()}
            >
                <Text>Go</Text>
            </TouchableOpacity>
        </View>
    );
}