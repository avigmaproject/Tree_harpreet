import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  divider: {
    height: 5,
  },
  topView: {
    top: 20,
    left: 17,
  },
  topText: {
    position: 'absolute',
    color: 'white',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    top: -5,
    left: 70,
    textAlign: 'center',
  },
  imgStyle: {width: 130, height: 130, borderRadius: 130 / 2},
  leftText: {
    position: 'absolute',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    left: -40,
    top: 80,
    textAlign: 'center',
  },
  rightText: {
    position: 'absolute',
    textShadowColor: '#000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    right: -30,
    top: 80,
    textAlign: 'center',
  },
  centerView: {
    position: 'absolute',
    top: -20,
  },
  centerParentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerInView: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
  },
});
