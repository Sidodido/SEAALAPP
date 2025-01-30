import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

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
      if (!TextRecognition) {
        throw new Error('TextRecognition is not initialized');
      }
      const text = await TextRecognition.recognize(imageUri);
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
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      )}
      <TouchableOpacity onPress={openImagePicker} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={styles.recognizedText}>{recognizedText || 'No text recognized'}</Text>
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  recognizedText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OCRPage;