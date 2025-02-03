import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from './src/components/navigation/DrawerNavigation';

import {Welcome, SignIn, OTP, OCR, LogIn} from './src/components/screens';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Welcome">
        <Stack.Screen name="OCRPage" component={OCR} />

        <Stack.Screen name="Main" component={DrawerNavigation} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LogIn" component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
