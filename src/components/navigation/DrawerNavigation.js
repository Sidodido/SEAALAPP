import React from 'react';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {
  APropos,
  Services,
  Historique,
  Profile,
  Home,
  Product,
} from '../screens';
import BottomNavigation from './BottomNavigation';
import {View, Text, Image, Button} from 'react-native';
import {colors, icons} from '../constants';
import {SafeAreaView} from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary,
              }}>
              <Image
                source={icons.avatar}
                style={{
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
                  color: colors.white,
                }}>
                Zidane Sidahmed
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.white,
                }}>
                Admin
              </Text>
            </View>

            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: 250,
        },
        headerStyle: {
          backgroundColor: colors.Quaternary,
          height: 60,
          borderRadius: 0,
        },
        headerShown: false,
        headerTintColor: colors.primary,
        drawerLabelStyle: {
          color: colors.Quaternary,
          fontSize: 14,
          marginLeft: -10,
        },
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: 'Acceuil',
          title: 'Acceuil',
          headerShadowVisible: false,
          drawerIcon: () => {
            return (
              <Image
                source={icons.Home1}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: colors.primary,
                }}
              />
            );
          },
        }}
        component={BottomNavigation}
      />

      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: '-------',
          title: 'Profile',
          headerShadowVisible: false,
          drawerIcon: () => {
            return (
              <Image
                source={icons.aPropos}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: colors.primary,
                }}
              />
            );
          },
        }}
        component={Profile}
      />

      <Drawer.Screen
        name="historique"
        options={{
          drawerLabel: '-------',
          title: 'historique',
          headerShadowVisible: false,
          drawerIcon: () => {
            return (
              <Image
                source={icons.caracteristique}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  tintColor: colors.primary,
                }}
              />
            );
          },
        }}
        component={Historique}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
