import React, {useState} from 'react';
import Header from '../../header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {colors, icons, images} from '../../constants';
import {Dimensions, StyleSheet} from 'react-native';
import {Avatar} from 'native-base';
import {Modal} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {Button, Switch} from 'react-native-paper';
import {useDisclose} from 'native-base';

const {width} = Dimensions.get('window');
const scale = width / 420;

export default function Parametres() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const onClose = () => setIsOpen(false);
  const {isOpend, onOped, onClosed} = useDisclose();
  const [visible, setVisible] = React.useState(false);
  const [textColor, setTextColor] = React.useState(colors.primary);

  const [visibleFourthModal, setVisibleFourthModal] = React.useState(false);
  const showFourthModal = () => setVisibleFourthModal(true);
  const hideFourthModal = () => setVisibleFourthModal(false);

  const [visibleFifthModal, setVisibleFifthModal] = React.useState(false);
  const showFifthModal = () => setVisibleFifthModal(true);
  const hideFifthModal = () => setVisibleFifthModal(false);

  const [visibleSixthModal, setVisibleSixthModal] = React.useState(false);
  const showSixthModal = () => setVisibleSixthModal(true);
  const hideSixthModal = () => setVisibleSixthModal(false);

  const [switchStates, setSwitchStates] = React.useState(Array(5).fill(false));

  const onToggleSwitch = index => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = !newSwitchStates[index];
    setSwitchStates(newSwitchStates);
  };

  const handlePress = () => {
    onOpen();
  };

  const handleDeleteItem = index => {
    setItems(prevItems => prevItems.filter((item, i) => i !== index));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.Quaternary}}>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Header title="parameters" />

        <View
          style={{
            width: '100%', // adjust the width to your needs
            backgroundColor: colors.tertiary,
            borderRadius: 10 * scale, // this will create a semi-circle
            position: 'fixed',
            top: 0,
            left: 0,
          }}>
          <NativeBaseProvider>
            {/* here the rest of code */}

            <View
              style={{
                height: 500, // adjust the height to your needs
                backgroundColor: colors.Quaternary,
                borderRadius: 20 * scale, // this will create a semi-circle
                position: 'fixed',
                marginHorizontal: 15 * scale,
                marginTop: 15 * scale,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 35 * scale,
                  marginTop: 25 * scale,
                  borderBottomWidth: 1, // add a bottom border width of 1
                  borderBottomColor: colors.secondary,
                  height: 80 * scale,
                }}>
                <Avatar
                  style={{
                    height: 60 * scale,
                    width: 60 * scale,
                    marginRight: 20 * scale,
                  }}
                  bg="purple.600"
                  alignSelf="start"
                  size="2xl"
                  source={icons.avatar}></Avatar>

                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16 * scale,
                      fontWeight: 'bold',
                      color: colors.white,
                    }}>
                    Zidane Sidahmed
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16 * scale,
                  marginLeft: 35 * scale,
                  marginTop: 20 * scale,
                  color: colors.secondary,
                }}>
                Parametres générale
              </Text>

              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: 40 * scale,
                  marginTop: 10 * scale,
                  borderBottomWidth: 1 * scale,
                  borderBottomColor: colors.secondary,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20 * scale,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16 * scale,
                      marginHorizontal: 10 * scale,
                      color: colors.white,
                    }}>
                    Notification
                  </Text>

                  <View
                    style={{
                      backgroundColor: colors.Quaternary,
                    }}>
                    <Switch
                      value={switchStates[0]}
                      onValueChange={() => onToggleSwitch(0)}
                      style={styles.switch}
                      thumbColor={
                        switchStates[0] ? colors.primary : colors.white
                      } // blue when on, gray when off
                      trackColor={{
                        true: colors.secondary,
                        false: colors.secondary,
                      }} // green when on, gray when off
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20 * scale,
                    alignItems: 'center',
                    marginBottom: 30 * scale,
                  }}>
                  <Text
                    style={{
                      fontSize: 16 * scale,
                      marginHorizontal: 10 * scale,
                      color: colors.white,
                    }}>
                    Mode sombre
                  </Text>

                  <View
                    style={{
                      backgroundColor: colors.Quaternary,
                    }}>
                    <Switch
                      value={switchStates[1]}
                      onValueChange={() => onToggleSwitch(1)}
                      style={styles.switch}
                      thumbColor={
                        switchStates[1] ? colors.primary : colors.white
                      } // blue when on, gray when off
                      trackColor={{
                        true: colors.secondary,
                        false: colors.secondary,
                      }} // green when on, gray when off
                    />

                    {/* WE STOPPED HERE */}
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16 * scale,
                  marginLeft: 35 * scale,
                  marginTop: 20 * scale,
                  color: colors.secondary,
                }}>
                Plus
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: 40 * scale,
                  marginTop: 10 * scale,
                }}>
                <TouchableOpacity onPress={showFourthModal}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20 * scale,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16 * scale,
                        marginHorizontal: 10 * scale,
                        color: colors.white,
                      }}>
                      À propos de nous
                    </Text>

                    <Image
                      source={icons.left}
                      style={{
                        height: 15 * scale,
                        width: 10 * scale,
                        tintColor: colors.white,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={showFifthModal}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20 * scale,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16 * scale,
                        marginHorizontal: 10 * scale,
                        color: colors.white,
                      }}>
                      Politique de confidentialité
                    </Text>

                    <Image
                      source={icons.left}
                      style={{
                        height: 15 * scale,
                        width: 10 * scale,
                        tintColor: colors.white,
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={showSixthModal}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20 * scale,
                      alignItems: 'center',
                      marginBottom: 30 * scale,
                    }}>
                    <Text
                      style={{
                        fontSize: 16 * scale,
                        marginHorizontal: 10 * scale,
                        color: colors.white,
                      }}>
                      Termes et conditions
                    </Text>

                    <Image
                      source={icons.left}
                      style={{
                        height: 15 * scale,
                        width: 10 * scale,
                        tintColor: colors.white,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </NativeBaseProvider>
        </View>

        <Modal
          visible={visibleFourthModal}
          onDismiss={hideFourthModal}
          contentContainerStyle={{
            padding: 40 * scale,
            margin: 40 * scale,
            backgroundColor: colors.white,
            borderRadius: 20 * scale,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20 * scale,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20 * scale,
                color: colors.Quaternary,

                flex: 1,
              }}>
              À propos de nous
            </Text>

            <TouchableOpacity style={{}} onPress={hideFourthModal}>
              <View></View>
              <Image
                source={icons.exitModel}
                style={{
                  height: 15 * scale,
                  width: 15 * scale,
                  tintColor: colors.Quaternary,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              textAlign: 'justify',

              fontSize: 16 * scale,
              color: colors.tertiary,
            }}>
            Chez House Trust, nous nous engageons à révolutionner l'expérience
            de la gestion immobilière en Algérie. Notre startup met à
            disposition une plateforme innovante qui facilite la communication,
            la transparence, et l'efficacité entre les propriétaires,
            locataires, et gestionnaires immobiliers. En combinant des
            technologies avancées et une interface conviviale, nous nous
            efforçons de simplifier chaque aspect de la gestion immobilière, du
            paiement des loyers à la maintenance des propriétés. Avec House
            Trust, gérez votre patrimoine immobilier en toute confiance et en
            toute sérénité.
          </Text>
        </Modal>

        <Modal
          visible={visibleFifthModal}
          onDismiss={hideFifthModal}
          contentContainerStyle={{
            padding: 40 * scale,
            margin: 40 * scale,
            backgroundColor: colors.white,
            borderRadius: 20 * scale,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20 * scale,
                color: colors.Quaternary,

                flex: 1,
              }}>
              confidentialité
            </Text>

            <TouchableOpacity style={{}} onPress={hideFifthModal}>
              <View></View>
              <Image
                source={icons.exitModel}
                style={{
                  height: 15 * scale,
                  width: 15 * scale,
                  tintColor: colors.Quaternary,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'justify',

              fontSize: 16 * scale,
              color: colors.tertiary,
            }}>
            Chez House Trust, la protection de vos données personnelles est
            notre priorité absolue. Nous nous engageons à respecter votre vie
            privée en assurant que toutes les informations collectées soient
            utilisées de manière sécurisée, transparente et conforme aux lois en
            vigueur. Nos pratiques de gestion des données sont conçues pour
            garantir la confidentialité, l'intégrité et la sécurité de vos
            informations. Que ce soit pour la gestion des comptes, les
            transactions ou l'utilisation de notre plateforme, nous veillons à
            ce que vos données soient traitées avec le plus grand soin. En
            utilisant House Trust, vous pouvez être certain que votre vie privée
            est protégée à chaque étape.
          </Text>
        </Modal>

        <Modal
          visible={visibleSixthModal}
          onDismiss={hideSixthModal}
          contentContainerStyle={{
            padding: 40 * scale,
            margin: 40 * scale,
            backgroundColor: colors.white,
            borderRadius: 20 * scale,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20 * scale,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20 * scale,
                color: colors.Quaternary,

                flex: 1,
              }}>
              Termes et conditions
            </Text>

            <TouchableOpacity style={{}} onPress={hideSixthModal}>
              <View></View>
              <Image
                source={icons.exitModel}
                style={{
                  height: 15 * scale,
                  width: 15 * scale,
                  tintColor: colors.Quaternary,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: 'justify',

              fontSize: 15 * scale,
              color: colors.tertiary,
            }}>
            Bienvenue chez House Trust. En utilisant notre plateforme, vous
            acceptez de vous conformer aux termes et conditions qui régissent
            l'utilisation de nos services. Ces conditions sont mises en place
            pour assurer une utilisation équitable, sécurisée et transparente de
            notre application par tous les utilisateurs, qu'ils soient
            propriétaires, locataires ou gestionnaires immobiliers. Nous vous
            encourageons à lire attentivement ces termes afin de comprendre vos
            droits et responsabilités. Chez House Trust, nous nous engageons à
            fournir un service de qualité tout en respectant les règles et les
            standards établis. En continuant à utiliser notre plateforme, vous
            acceptez de respecter ces conditions pour une expérience optimale.
          </Text>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

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
    height: 24 * scale,
    width: 24 * scale,
    tintColor: colors.Quaternary,
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
});
