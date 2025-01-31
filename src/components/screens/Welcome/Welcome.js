import React from 'react';
import Header from '../../header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {colors, icons, images} from '../../constants';
import {Dimensions, StyleSheet} from 'react-native';
import {Button, Card, Switch} from 'react-native-paper';

const {width} = Dimensions.get('window');
const scale = width / 420;

export default function Welcome({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.Quaternary}}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.Quaternary,
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 'auto',
          }}>
          <Image
            source={images.LOGO}
            style={{width: 150, height: 150, marginBottom: 50}}
          />

          <Button
            style={{
              width: 170 * scale,
              backgroundColor: colors.white,
              marginHorizontal: 'auto',
              borderRadius: 10,

              color: colors.white,
            }}
            mode="contained"
            onPress={() => navigation.navigate('LogIn')}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 17 * scale,
                fontWeight: 'bold',
              }}>
              commencer
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
