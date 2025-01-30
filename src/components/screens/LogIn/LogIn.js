import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image,  TextInput, StyleSheet } from 'react-native';

import { NativeBaseProvider } from 'native-base';

import { colors, icons, images } from '../../constants';
import { Dimensions } from 'react-native';
import { Button} from 'react-native-paper';

const { width } = Dimensions.get('window');
const scale = width / 420;

export default function LogIn({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [text, onChangeText] = React.useState('');
  const [mdp, onChangeMdp] = React.useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          alignItems: 'center',
        }}>
        <NativeBaseProvider>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginVertical: 'auto',
            }}>
            <Image
              source={images.LOGO}
              style={{
                width: 150 * scale,
                height: 150 * scale,
                marginBottom: 50 * scale,
              }}
            />

            <View style={{ width: 350 * scale, marginBottom: 30 * scale }}>
              <Text
                style={{
                  fontSize: 20 * scale,
                  color: colors.primary,
                  textAlign: 'left',
                  fontWeight: 'bold',
                }}>
                Se connecter
              </Text>
            </View>



            <View style={{ width: '100%' }}>




              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder=""
                keyboardType="numeric"
              /></View>
            <Text style={{ fontWeight: 'bold', color: colors.Quaternary, position: 'absolute', backgroundColor: '#fff', width: 130, top: 250, left: 20, paddingLeft: 10 }}>
              Nom d’utilisateur
            </Text>
            <View style={{ width: '100%' }}>




              <TextInput
                style={styles.input}
                onChangeText={onChangeMdp}
                value={mdp}
                placeholder=""
                keyboardType="numeric"
              /></View>
            <Text style={{ fontWeight: 'bold', color: colors.Quaternary, position: 'absolute', backgroundColor: '#fff', width: 110, top: 315, left: 20, paddingLeft: 10 }}>
              Mot de passe
            </Text>

  <Button
              style={{
                width: 170 * scale,
                backgroundColor: colors.primary,
                left:80,
                top:10,
                borderRadius: 10,
                color: colors.white,
              }}
              mode="contained"
              onPress ={() => navigation.navigate('Main')}
              >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 17 * scale,
                  fontWeight: 'bold',
                }}>
               commencer
              </Text>
            </Button>




          </View>
        </NativeBaseProvider>
      </View>
    </SafeAreaView>

    //  <Navigation/>
  );
}
const styles = StyleSheet.create({
  input: {
    width: '96%',
    borderRadius: 10,
    height: 50,
    margin: 7,
    borderWidth: 1.5,
    padding: 10,

    borderColor: colors.Quaternary,
    color: colors.Quaternary
  },
});