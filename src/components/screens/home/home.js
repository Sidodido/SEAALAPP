import React, {useState} from 'react';
import { Alert, ScrollView, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Header from '../../header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, icons, images} from '../../constants';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Dimensions} from 'react-native';
import Menu from './menu';
import {
  launchImageLibrary as _launchImageLibrary,
  launchCamera as _launchCamera,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation





let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;

const {width} = Dimensions.get('window');
const scale = width / 420;

export default function home() {
  //----------------------------------------------
  const [selectedFile, setSelectedFile] = useState(null);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Check if the selected file is within the 5 MB limit
      const fileSize = await RNFS.stat(result.uri);
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      if (fileSize.size > maxSize) {
        Alert.alert(
          'File Size Limit Exceeded',
          'Please select a file up to 5 MB.',
        );
      } else {
        setSelectedFile(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        throw err;
      }
    }
  };
  const uploadFile = () => {
    // Implement your file upload logic here
    if (selectedFile) {
      // You can use the selectedFile.uri to get the file path for upload
      Alert.alert(
        'File Uploaded',
        `File ${selectedFile.name} has been uploaded successfully.`,
      );
    } else {
      Alert.alert('No File Selected', 'Please select a file to upload.');
    }
  };

  //-------------------------------------
  const [items, setItems] = useState(Menu);

  //-------------------------------
  const [selectedImage, setSelectedImage] = useState(null);



  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };


  //--------------------------------------------------------

  const navigation = useNavigation(); // Get the navigation object

  const handleImagePress = (items) => {
    // Navigate to the OCR page and pass the data
    navigation.navigate('OCRPage', { data: items });
  };
  return (
    <SafeAreaView style={{backgroundColor: '#58626E'}}>
      <Header title="La tourné" />
      <View style={{padding: 10}}>
        <View
          style={{
            width: '100%',
            height: '94%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 10,
          }}>
          <Image
            source={icons.avatar}
            style={{
              marginTop: 20,
              height: 100,
              width: 100,
              marginBottom: 6,
              borderRadius: 50,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.Quaternary,
            }}>
            Zidane Sidahmed
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.Quaternary,
            }}>
            La date : 17/01/2025
          </Text>
    
          <Button  onPress={pickDocument}
            style={{
              backgroundColor: colors.primary,
          marginTop:70,
              borderRadius: 10,
              color: colors.white,
            }}
            mode="contained">
            <Text
              style={{
                color: colors.white,
                fontSize: 17 * scale,
                fontWeight: 'bold',
              }}>
              Importer les donnes de la tourné
            </Text>
          </Button>

          <Image onPress={uploadFile}
            source={icons.download}
            style={{
              height: 100,
              width: 100,
              marginBottom: 6,
              borderRadius: 50,
              tintColor:colors.primary,
            }}
          /> 

          <ScrollView style={{borderRadius:10,width: '98%'}}>
            {items.map(elem => {
              const {id, acces, title, category, adresseIP, adresseMAC} = elem;
              return (
                <View
                  key={id}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 80,
                    backgroundColor: colors.secondary,
                    marginTop: 10,
                    borderRadius: 15,
                    width: '100%',
                  }}>
                  <Image
                    source={icons.notVerified}
                    style={{
                      marginLeft: 10,
                      alignItems: 'center',
                      height: 35,
                      width: 35,
                      borderRadius: 50,
                    }}
                  />

                  <View style={{flex: 1, marginLeft: 10}}>
                    <Text
                      style={{fontWeight: 'bold', color: colors.Quaternary}}>
                      {title}
                    </Text>

                    <Text style={{color: colors.Quaternary}}>{adresseIP}</Text>
                  </View>

                  <View style={{marginRight:10,justifyContent: 'center'}}>
                    {/* {selectedImage && (
                      <Image
                        source={{uri: selectedImage}}
                        style={{flex: 1}}
                        resizeMode="contain"
                      />
                    )} */}

                  
                    <View  style={{width: 50}}>

                    <TouchableOpacity onPress={() => handleImagePress(elem)}>
                      {/* <TouchableOpacity onPress={handleCameraLaunch}> */}
                      <Image
                        source={icons.scan}
                        style={{
                          marginLeft: 10,
                          alignItems: 'center',
                          height: 35,
                          width: 35,
                          
                        }}
                        
                      />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
