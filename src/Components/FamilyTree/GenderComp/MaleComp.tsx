import React from 'react';
import {
  View,
  Text,
  StyleProp,
  Image,
  ImageBackground,
  StyleSheet,
  TextStyle,
  ImageStyle,
} from 'react-native';

export type Props = {
  profile: string;
  name: string;
  imageStyle: StyleProp<ImageStyle>;
  nodeTitleColor: string;
  nodeTitleStyle: StyleProp<TextStyle>;
  totalWords: number;
};

const MaleComp: React.FC<Props> = props => {
  const {
    profile,
    name,
    imageStyle,
    nodeTitleColor,
    nodeTitleStyle,
    totalWords,
  } = props;
  return (
    // <View style={{width: '100%', height: '100%'}}>
    <ImageBackground
      source={require('../../../assets/male-ring.png')}
      style={[
        imageStyle,
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      resizeMode="contain">
      <Image
        source={{
          uri: profile,
        }}
        resizeMode="cover"
        style={{width: 65, height: 65, borderRadius: 65 / 2}}
      />
      <View
        style={{
          ...styles.nodeTitleContainerStyle,
          position: 'absolute',
          bottom: 0,
        }}>
        <Text style={[{color: nodeTitleColor}, nodeTitleStyle]}>{name}</Text>
      </View>
    </ImageBackground>
    // </View>
  );
};

const styles = StyleSheet.create({
  nodeTitleContainerStyle: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#30AD4A',
  },
});

export default MaleComp;
