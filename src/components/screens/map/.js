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
} from 'react-native';

import { WebView } from 'react-native-webview';
import html_script from './html_script';

class App extends React.Component {
  state = {
    address: '',
    destination1: '',
    destination2: '',
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

  _setRoute = async () => {
    const { destination1, destination2 } = this.state;
    const dest1Coords = await this._getDestinationCoordinates(destination1);
    const dest2Coords = await this._getDestinationCoordinates(destination2);

    // Clear previous routes before setting new ones
    this.refs['Map_Ref'].injectJavaScript(`clearRoute();`);

    if (dest1Coords) {
      this.refs['Map_Ref'].injectJavaScript(`
        setRoute(${this.state.startLat}, ${this.state.startLon}, ${dest1Coords.lat}, ${dest1Coords.lon});
      `);
    }

    if (dest2Coords) {
      this.refs['Map_Ref'].injectJavaScript(`
        setRoute(${this.state.startLat}, ${this.state.startLon}, ${dest2Coords.lat}, ${dest2Coords.lon});
      `);
    }
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.Container}>
          <WebView ref={'Map_Ref'} source={{ html: html_script }} style={styles.Webview} />
          <View style={styles.InputArea}>
            <TextInput
              style={styles.Input}
              placeholder="Entrez une adresse"
              value={this.state.address}
              onChangeText={(text) => this.setState({ address: text })}
            />
            <TouchableOpacity style={styles.Button} onPress={this._getCoordinates}>
              <Text style={styles.ButtonText}>Rechercher</Text>
            </TouchableOpacity>
          </View>
          







         {/* Zone d'entrée pour la première destination */}
         <View style={styles.InputArea}>
            <TextInput
              style={styles.Input}
              placeholder="Entrez la première destination"
              value={this.state.destination1}
              onChangeText={(text) => this.setState({ destination1: text })}
            />
            <TouchableOpacity style={styles.Button} onPress={this._setRoute}>
              <Text style={styles.ButtonText}>Itinéraire 1</Text>
            </TouchableOpacity>
          </View>

          {/* Zone d'entrée pour la deuxième destination */}
          <View style={styles.InputArea}>
            <TextInput
              style={styles.Input}
              placeholder="Entrez la deuxième destination"
              value={this.state.destination2}
              onChangeText={(text) => this.setState({ destination2: text })}
            />
            <TouchableOpacity style={styles.Button} onPress={this._setRoute}>
              <Text style={styles.ButtonText}>Itinéraire 2</Text>
            </TouchableOpacity>
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
    backgroundColor: 'grey',
  },
  Webview: {
    flex:2
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
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  Button: {
    width: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'black',
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