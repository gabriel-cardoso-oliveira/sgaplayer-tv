import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
// import {navigate} from '../Navigation';
import FocusableHighlight from '../components/focusable/FocusableHighlight';
import FocusableOpacity from '../components/focusable/FocusableOpacity';
import useStateRef from '../hooks/useStateRef';
import logo from '../assets/icon.png';
import Style from '../styles/Style';

const Home = () => {
  const inputTextRef = useRef(null);
  const showModalButtonRef = useRef(null);
  const hideModalButtonRef = useRef(null);

  const [urlPlayer, setUrlPlayer] = useState('');
  const [zoom, setZoom] = useState('100');

  const [modalVisibleRef, isModalVisible, setModalVisible] = useStateRef(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Prevent react navigation to handle back button is modal is visible
      return navigation.addListener('beforeRemove', (e) => {
        if (isModalVisible()) {
          e.preventDefault();
        }
      });
    }
  }, []);

  async function init() {
    try {
      const getUrl = await AsyncStorage.getItem('@storage_url');
      const getZoom = await AsyncStorage.getItem('@storage_zoom');

      setUrlPlayer(getUrl);

      return setZoom(getZoom ? getZoom : '100');
    } catch (error) {}
  }

  useEffect(() => {
    init();
  }, []);

  async function handleSubmit() {
    if (!urlPlayer || !zoom) {
      console.log(zoom);
      return setModalVisible(true);
    }

    try {
      await AsyncStorage.setItem('@storage_url', urlPlayer);
      await AsyncStorage.setItem('@storage_zoom', zoom);

      // navigate('Home');
    } catch (error) {}
  }

  return (
    <View style={Style.styles.right}>
      <View style={Style.styles.header}>
        <Image style={Style.styles.logo} source={logo} />
        {/* <Text style={Style.styles.headerText}>{'Bem vindo!'}</Text> */}
      </View>
      <View style={Style.styles.content}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.component}>
            <View style={styles.container}>
              <Text style={styles.labelInput}>URL SGA Player</Text>
              <View style={[styles.container, styles.horizontal]}>
                <TextInput
                  ref={inputTextRef}
                  nativeID={'component_text_input'}
                  placeholder={'URL SGA Player'}
                  placeholderTextColor={'gray'}
                  clearButtonMode={'always'}
                  autoCorrect={false}
                  autoFocus={false}
                  style={styles.textInput}
                  value={urlPlayer}
                  onChangeText={setUrlPlayer}
                  keyboardType="url"
                />
                {Platform.OS === 'android' && (
                  <FocusableHighlight
                    onPress={() => {}}
                    onFocus={() => {
                      if (inputTextRef.current) {
                        inputTextRef.current.focus();
                      }
                    }}
                    style={styles.dummyButton}>
                    <Text />
                  </FocusableHighlight>
                )}
              </View>
            </View>
          </View>
          <View style={styles.component}>
            <View style={styles.container}>
              <Text style={styles.labelInput}>Zoom da página (%)</Text>
              <View style={[styles.container, styles.horizontal]}>
                <TextInput
                  ref={inputTextRef}
                  nativeID={'component_text_input'}
                  placeholder={'Porcentagem do zoom da página'}
                  placeholderTextColor={'gray'}
                  clearButtonMode={'always'}
                  autoCorrect={false}
                  autoFocus={false}
                  style={styles.textInput}
                  value={zoom}
                  onChangeText={setZoom}
                  keyboardType="numeric"
                  maxLength={3}
                />
                {Platform.OS === 'android' && (
                  <FocusableHighlight
                    onPress={() => {}}
                    onFocus={() => {
                      if (inputTextRef.current) {
                        inputTextRef.current.focus();
                      }
                    }}
                    style={styles.dummyButton}>
                    <Text />
                  </FocusableHighlight>
                )}
              </View>
            </View>
          </View>
          <View style={styles.component}>
            <View style={styles.container}>
              <View style={[styles.container, styles.horizontal]}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisibleRef.current}
                  onShow={() => {
                    console.log('Modal.onShow()');
                    // No way to focus the hide button on AndroidTv
                  }}
                  onDismiss={() => {
                    console.log('Modal.onDismiss()');
                    // Required for web
                    if (Platform.OS === 'web') {
                      // Force focus on previous button
                      if (showModalButtonRef) {
                        showModalButtonRef.current.focus();
                      }
                    }
                  }}
                  onRequestClose={() => {
                    console.log('Modal.onRequestClose()');
                    setModalVisible(false);
                  }}
                  style={styles.modal}>
                  <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Atenção! É necessário preencher todos os campos.
                      </Text>
                      <FocusableHighlight
                        ref={hideModalButtonRef}
                        nativeID={'component_hide_modal_button'}
                        focusable={modalVisibleRef.current}
                        hasTVPreferredFocus={modalVisibleRef.current}
                        onPress={() => {
                          setModalVisible(false);
                        }}
                        style={styles.modalOpenButton}
                        underlayColor={Style.buttonUnfocusedColor}
                        styleFocused={{
                          backgroundColor: Style.buttonFocusedColor,
                        }}
                        stylePressed={{
                          backgroundColor: Style.buttonPressedColor,
                        }}>
                        <Text style={styles.buttonText}>Fechar</Text>
                      </FocusableHighlight>
                    </View>
                  </View>
                </Modal>
                <FocusableOpacity
                  nativeID={'component_touchable_opacity'}
                  onPress={handleSubmit}
                  style={styles.button}
                  color={Style.buttonUnfocusedColor}
                  colorFocused={Style.buttonFocusedColor}
                  colorPressed={Style.buttonPressedColor}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </FocusableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollview: {
    // width: Style.px(1520),
    width: '100%',
    height: Style.px(780),
  },
  component: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: Style.px(200),
    fontSize: Style.px(20),
    color: 'white',
  },
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Style.px(10),
  },
  labelInput: {
    fontWeight: 'bold',
    fontSize: Style.px(46),
    color: '#fff',
    marginLeft: Style.px(100),
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: Style.px(100),
    paddingBottom: Style.px(10),
    paddingTop: Style.px(10),
    fontSize: Style.px(48),
    justifyContent: 'center',
    borderRadius: 2,
    marginTop: Style.px(12),
    marginBottom: Style.px(40),
    marginRight: Style.px(90),
    marginLeft: Style.px(90),
    color: '#fff',
  },
  dummyButton: {
    position: 'absolute',
    width: Style.px(20),
    height: Style.px(20),
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: Style.px(100),
    margin: Style.px(10),
    borderRadius: 2,
    backgroundColor: Style.buttonUnfocusedColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Style.px(90),
    marginLeft: Style.px(90),
  },
  buttonText: {
    fontSize: Style.px(58),
    fontWeight: 'bold',
    color: '#fff',
  },
  modal: {},
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: Style.px(500),
    height: Style.px(300),
    margin: 20,
    backgroundColor: Style.modalBackgroundColor,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOpenButton: {
    backgroundColor: Style.buttonUnfocusedColor,
    borderRadius: Style.px(20),
    padding: Style.px(10),
    elevation: Style.px(2),
  },
  modalText: {
    height: Style.px(130),
    fontSize: Style.px(30),
    color: 'white',
    textAlign: 'center',
  },
});
