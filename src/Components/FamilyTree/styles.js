import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  spouseConnectingPathContainer: {
    height: '50%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  nodesLinkContainer: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
  },
  spouseInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    width: 200,
    paddingRight: 48,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeTitleStyle: {
    position: 'absolute',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default styles;
