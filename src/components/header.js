import {TouchableOpacity, Image} from 'react-native';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors, icons, images} from './constants';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const scale = width / 420;

const header = ({title, onPress}) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            resizeMode="contain"
            style={{
              height: 45 * scale,
              width: 45 * scale,
            }}
            source={images.LOGO}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20 * scale,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            color: colors.white,
          }}>
          {title}
        </Text>

        <View style={{}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            backdropColor="black"
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 19 * scale,
                      width: 19 * scale,
                      tintColor: colors.Quaternary,
                      marginLeft: '90%',
                    }}
                    source={icons.exitModel}
                  />
                </TouchableOpacity>
                <View style={{alignItems: 'center', marginBottom: 30}}>
                  <Image
                    source={icons.avatar}
                    style={{
                      marginTop: 20,
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
                      color: colors.Quaternary,
                    }}>
                    Zidane Sidahmed
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.Quaternary,
                    }}>
                    La date : 17/01/2025
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.Quaternary,
                    }}>
                    status de la tourne
                  </Text>
                </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Déconnecté</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={icons.profile}
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
    paddingVertical: 16 * scale,
    paddingHorizontal: 20 * scale,
    backgroundColor: colors.Quaternary,
  },
  iconContainer: {
    height: 45 * scale,
    width: 45 * scale,
    borderRadius: 50 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  exitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0 * scale,
  },
  icon: {
    height: 45 * scale,
    width: 45 * scale,
    tintColor: colors.white,
  },
  exit: {
    height: 24 * scale,
    width: 24 * scale,
    tintColor: colors.tertiary,
    marginLeft: -30,
    marginRight: 20,
  },
  deleteButton: {
    position: 'absolute',
    right: 10 * scale,
    top: 10 * scale,
  },
  deleteIcon: {
    height: 20 * scale,
    width: 20 * scale,
    tintColor: colors.error,
  },

  modalView: {
    margin: 20,
    marginTop: '20%',
    backgroundColor: colors.tertiary,
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default header;
