import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  spouseConnectingPathContainer: {
    height: '90%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  nodesLinkContainer: {
    width: 21,
    height: 21,
    borderRadius: 21 / 2,
  },
  spouseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    width: 200,
    paddingRight: 48,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeTitleContainerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#30AD4A',
  },
});

export default styles;
