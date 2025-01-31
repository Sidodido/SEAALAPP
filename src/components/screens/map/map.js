/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  Image
} from 'react-native';

import { WebView } from 'react-native-webview';
import html_script from './html_script';
import data from './data';
import { colors,icons } from '../../constants';
class App extends React.Component {
  state = {
    address: '',
    startLat: 36.88017, // Default starting latitude
    startLon: 3.4380,   // Default starting longitude
  };

_goToMyPosition = (lat, lon, zoomLevel = 10) => {
  this.refs['Map_Ref'].injectJavaScript(`
    mymap.setView([${lat}, ${lon}], ${zoomLevel});
    L.marker([${lat}, ${lon}]).addTo(mymap);
  `);
};

_getCoordinates = async () => {
  const { address } = this.state;
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();

  if (data.length > 0) {
    const { lat, lon } = data[0];
    console.log(`Coordinates found: (${lat}, ${lon})`);
    this.setState({ startLat: lat, startLon: lon }); // Update starting coordinates
    this._goToMyPosition(lat, lon, 18);
  } else {
    alert('Address not found');
  }
};

_getDestinationCoordinates = async (destination) => {
  if (!destination) {
    alert('Please enter a destination');
    return null;
  }

  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`);
  const data = await response.json();

  console.log(`Response for destination "${destination}":`, data); // Log the response

  if (data.length > 0) {
    const { lat, lon } = data[0];
    console.log(`Destination found: (${lat}, ${lon})`);
    return { lat, lon };
  } else {
    alert('Destination not found');
    return null;
  }
};

_setRoutes = async () => {
  // Loop through the imported data and set routes for each destination
  for (const item of data) {
    const destCoords = await this._getDestinationCoordinates(item.destination);
    if (destCoords) {
      this.refs['Map_Ref'].injectJavaScript(`
        setRoute(${this.state.startLat}, ${this.state.startLon}, ${destCoords.lat}, ${destCoords.lon});
      `);
    }
  }
};

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.Container}>
          <WebView ref={'Map_Ref'} source={{ html: html_script }} style={styles.Webview} />
        
          
<View style={styles.recherche}>
          <View style={styles.InputArea}>
            <TextInput
              style={styles.Input}
              placeholder="Entrez une adresse de départ"
              value={this.state.address}
              onChangeText={(text) => this.setState({ address: text })}
            />
            <TouchableOpacity onPress={this._getCoordinates}>
                <Image
                       source={icons.rechercheDest}
                       style={{
                         height: 40,
                         width: 40,
                         tintColor:colors.primary
                       }}
                     />
            </TouchableOpacity>
          </View>

          {/* Button to set all routes */}
          <View style={styles.ButtonArea}>
            <TouchableOpacity  onPress={this._setRoutes}>
        <Image
                       source={icons.trajectoire}
                       style={{
                         height: 100,
                         width: 100,
                         tintColor:colors.primary
                       }}
                     />
            </TouchableOpacity>
          </View>
          </View>








        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white
  },
  Webview: {
    flex:2
  },
  recherche:{
    height:300
  },
  InputArea: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height:100
  },
  Input: {
    flex: 1,
    height: 40,
    borderColor: colors.Quaternary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color:colors.Quaternary
  },
  Button: {
    width: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ButtonArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;