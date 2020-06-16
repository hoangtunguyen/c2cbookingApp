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
import ImagePicker from 'react-native-image-picker';

export default UploadImageComponent = ({setFormRequest, formRequest}) => {
    const [photo, setPhoto] = useState(formRequest.urlImage);
    async function cloudinaryUpload(source) {
        try {
            var myHeader = new Headers();
            myHeader.append("Authorization", "Client-ID 565fdce260b5f64");
            var data = new FormData();
            data.append('image', source);

            let response = await fetch(
                'https://api.imgur.com/3/upload', {
                method: "POST",
                body: data,
                headers: myHeader
            }
            );
            let json = await response.json();
            console.log(json.data.link);
            setPhoto(json.data.link);

            setFormRequest((pre) => {
                return {
                    ...pre,
                    "urlImage": json.data.link
                }
            })

        } catch (error) {
            console.error(error);
        }
    }
    const selectPhotoTapped = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                const type = response.type;
                const name = response.fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
                cloudinaryUpload(response.data);

            }
        });
    };
    return (
        <View>
            <TouchableOpacity
                onPress={selectPhotoTapped}
                style={{ width: '100%', height: 300 }}>
                <Image source={{ uri: photo }} style={{ flex: 1, width: null, height: null, resizeMode: "cover" }}></Image>
            </TouchableOpacity>
        </View>
    );
}