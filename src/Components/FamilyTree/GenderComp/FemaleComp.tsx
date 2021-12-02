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

const FemaleComp: React.FC<Props> = props => {
  const {
    profile,
    name,
    imageStyle,
    nodeTitleColor,
    nodeTitleStyle,
    totalWords,
  } = props;
  return (
    <ImageBackground
      source={{uri: profile}}
      style={[
        imageStyle,
        {alignItems: 'center', borderWidth: 10, borderColor: 'yellow'},
      ]}
      borderRadius={50}>
      <View
        style={{
          ...styles.nodeTitleContainerStyle,
          bottom: -10 * totalWords,
        }}>
        <Text style={[{color: nodeTitleColor}, nodeTitleStyle]}>{name}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  nodeTitleContainerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#30AD4A',
  },
});

export default FemaleComp;
