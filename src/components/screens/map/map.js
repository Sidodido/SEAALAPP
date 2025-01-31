/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';

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
import { ScrollView } from 'react-native';




class App extends React.Component {




  state = {
    address: '',
    startLat: 36.88017, // Default starting latitude
    startLon: 3.4380,   // Default starting longitude
     destinationsWithDistances: [],
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

// Ajoutez cette fonction pour calculer la distance
calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = this.deg2rad(lat2 - lat1);
  const dLon = this.deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en kilomètres
};

// Fonction pour convertir les degrés en radians
deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

_setRoutes = async () => {
  const destinationsWithDistances = []; // Tableau pour stocker les destinations et leurs distances

  for (const item of data) {
    const destCoords = await this._getDestinationCoordinates(item.destination);
    if (destCoords) {
      const distance = this.calculateDistance(this.state.startLat, this.state.startLon, destCoords.lat, destCoords.lon);
      console.log(`Distance to ${item.destination}: ${distance.toFixed(2)} km`);

      // Ajouter la destination et la distance au tableau
      destinationsWithDistances.push({ destination: item.destination, distance });

      this.refs['Map_Ref'].injectJavaScript(`
        setRoute(${this.state.startLat}, ${this.state.startLon}, ${destCoords.lat}, ${destCoords.lon});
      `);
    }
  }

  // Trier les destinations par distance (du plus court au plus long)
  destinationsWithDistances.sort((a, b) => a.distance - b.distance);

  // Mettre à jour l'état avec les destinations triées
  this.setState({ destinationsWithDistances });
};

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.Container}>
          <WebView ref={'Map_Ref'} source={{ html: html_script }} style={styles.Webview} />
        
          <ScrollView  style={styles.scrollview}>
          
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



<View style={styles.destinationsList}>
            {this.state.destinationsWithDistances.map((item, index) => (




              // <Text key={index} style={styles.destinationText}>
              //   {item.destination}: {item.distance.toFixed(2)} km
              // </Text>



 <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 80,
                    backgroundColor: colors.tertiary,
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
                      {item.distance.toFixed(2)} km
                    </Text>

                    <Text style={{color: colors.Quaternary}}>{item.destination}</Text>
                  </View>

                </View>
            ))}
          </View>


</ScrollView>

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
   scrollview: {
    flex:2
  },
  recherche:{
    height:300
  },
  destinationsList: {
 flex:1,
  paddingLeft:10,
  backgroundColor: colors.lightGray, // Couleur de fond pour la liste
  borderRadius: 5,
  marginBottom:100,
},
destinationText: {
  fontSize: 16,
  color: colors.black,
  marginVertical: 5,
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
   
  },
});

export default App;