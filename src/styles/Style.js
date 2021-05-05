import {Platform, PixelRatio, StyleSheet} from 'react-native';

// Get pixel ratio
let pixelRatio = PixelRatio.get();
if (Platform.OS === 'web') {
  pixelRatio = 1;
}

// Screen height
let height = 1080;

const Style = {
  backgroundColor: '#282c34',
  modalBackgroundColor: '#444c58',
  buttonUnfocusedColor: '#3b9eff',
  buttonFocusedColor: '#fff',
  buttonPressedColor: '#ccc',
  px: (size) => {
    return Math.round((size * (height / 1080)) / pixelRatio);
  },
};

Style.styles = StyleSheet.create({
  logo: {
    width: Style.px(300),
    height: Style.px(250),
    resizeMode: 'contain',
    marginRight: Style.px(20),
  },
  right: {
    backgroundColor: Style.backgroundColor,
    // width: Style.px(1520),
    width: Style.px(1780),
    height: Style.px(1080),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // width: Style.px(1520),
    width: Style.px(1780),
    height: Style.px(288),
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Style.px(40),
  },
  headerText: {
    fontSize: Style.px(60),
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    // width: Style.px(1520),
    width: Style.px(1780),
    height: Style.px(780),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Style.px(40),
    // paddingTop: '10%',
  },
});

export default Style;
