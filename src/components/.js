import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';

const OCRPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User  cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      const imageUri = response.assets?.[0]?.uri;
      if (imageUri) {
        setSelectedImage(imageUri);
        recognizeText(imageUri);
      }
    }
  };

  const recognizeText = async imageUri => {
    setLoading(true);
    try {
      // Ensure you have the correct language code
      const text = await RNTesseractOcr.recognize(imageUri, 'LANG_ENGLISH','iygtvyg');
      const numbers = text.match(/\d+/g);
      setRecognizedText(numbers ? numbers.join(', ') : 'No numbers recognized');
    } catch (error) {
      console.error('Error recognizing text:', error);
      setRecognizedText('Error recognizing text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image
          source={{uri: selectedImage}}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
      )}
      <TouchableOpacity onPress={openImagePicker}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text>{recognizedText || 'No text recognized'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default OCRPage;
