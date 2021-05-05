import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {navigate} from '../Navigation';
import {AppContext} from '../AppProvider';
import Style from '../styles/Style';
import reactLogoImageSource from '../assets/icon.png';
import FocusableHighlight from './focusable/FocusableHighlight';

const Menu = () => {
  const [appContext, setAppContext] = useContext(AppContext);

  function showMenu() {
    const items = ['Components', 'Events', 'Focus', 'Scroll', 'Input', 'Video'];
    return items.map((item) => {
      const key = 'menu_' + item.toLowerCase();
      const route = item.toLowerCase();
      return (
        <FocusableHighlight
          onPress={() => {
            navigate(route);
          }}
          underlayColor={Style.buttonFocusedColor}
          style={styles.menuItem}
          nativeID={key}
          key={key}>
          <Text style={styles.text}>{item}</Text>
        </FocusableHighlight>
      );
    });
  }

  return appContext.menuVisible ? (
    <View style={styles.left}>
      <Image style={styles.logo} source={reactLogoImageSource} />
      <View style={styles.menu}>{showMenu()}</View>
    </View>
  ) : null;
};

export default Menu;

const styles = StyleSheet.create({
  left: {
    backgroundColor: Style.backgroundColor,
    width: Style.px(400),
    height: Style.px(1080),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Style.px(250),
    height: Style.px(200),
    margin: Style.px(20),
    marginBottom: Style.px(10),
    resizeMode: 'contain',
  },
  title: {
    fontSize: Style.px(30),
    color: 'white',
  },
  menu: {
    width: Style.px(460),
    height: Style.px(800),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Style.px(40),
  },
  menuItem: {
    width: Style.px(360),
    height: Style.px(90),
    margin: Style.px(10),
    backgroundColor: Style.buttonUnfocusedColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  text: {
    fontSize: Style.px(40),
    fontWeight: '900',
  },
});
