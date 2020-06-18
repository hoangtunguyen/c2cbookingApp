import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, StyleSheet, StatusBar, ImageBackground, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { baseURL } from "../util/Util";
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-community/async-storage';
export default WelcomeScreen = ({ navigation }) => {
  const [formUser, setFormUser] = useState({
    "username": null,
    "password": null
  })
  // const [ipServer, setIpServer] = useState('192.168.1.7');
  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem('userId', data +'');
      //   getData();
      // navigation.navigate('Home')
      const value = await AsyncStorage.getItem('userId');

      console.log(value);
      navigation.navigate('Home')
    } catch (e) {
      // saving error
    }
  };
  async function signIn() {
    try {
      const response = await fetch(baseURL + '/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": formUser.username,
          "password": formUser.password
        })
      });
      const data = await response.json();
      if (response.status == 200) {
        // console.log(data);
       storeData(data.userId);
      }
      else if (response.status == 404) {
        Toast.show(data.message, Toast.SHORT);

      }
    }
    catch (error) {
      console.error(error);
    }
  };
  const login = () => {
    signIn();
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          source={require("../asserts/img/header.png")}
          // source={{uri:"https://i.imgur.com/cNCe5gW.png"}}

          style={styles.imageBackground}
        >
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30
          }}>Welcome Back</Text>
          <Text style={{
            color: 'yellow'
          }}>C2C BOOKING APP</Text>

        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.title, {
          marginTop: 50
        }]}>Username</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your username.."
            style={styles.textInput}
            onChangeText={(val) => setFormUser((pre) => {
              return {
                ...pre,
                "username" : val
              }
            })}
          />
        </View>

        <Text style={[styles.title, {
          marginTop: 20
        }]}>Password</Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry
            placeholder="Your password.."
            style={styles.textInput}
            onChangeText={(val) => setFormUser((pre) => {
              return {
                ...pre,
                "password" : val
              }
            })}
          />
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <TouchableOpacity
            style={{ width: 250, height: 50, backgroundColor: '#66a3ff', borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => login()}>

            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    padding: 20
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%'
  },
  title: {
    color: 'black',
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: 'gray'
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: '#a1c4fd',
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});