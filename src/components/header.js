import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, icons,images} from './constants';


import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const scale = width / 420;



const header = ({title, onPress}) => {
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            resizeMode="contain"
            style={{
              height: 45* scale,
              width: 45* scale,
             
            }}
            source={images.LOGO}
          />
        </TouchableOpacity>

        <Text
          style={{
           
            fontSize: 20* scale,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            color: colors.white,
          }}>
          {title}
        </Text>

        <TouchableOpacity style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={icons.notification}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16* scale,
    paddingHorizontal: 20* scale,
    backgroundColor: colors.Quaternary,
  },
  iconContainer: {
    height: 45* scale,
    width: 45* scale,
    borderRadius: 50* scale,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  exitContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0* scale,
  },
  icon: {
    height: 24* scale,
    width: 24* scale,
    tintColor: colors.white,
    
  },
  exit: {
    height: 24* scale,
    width: 24* scale,
    tintColor: colors.tertiary,
    marginLeft:-30,
    marginRight:20
  },
  deleteButton: {
    position: 'absolute',
    right: 10* scale,
    top: 10* scale,
  },
  deleteIcon: {
    height: 20* scale,
    width: 20* scale,
    tintColor: colors.error,
  },
});

export default header;
