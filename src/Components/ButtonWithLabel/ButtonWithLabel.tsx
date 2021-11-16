import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styles from './styles';

export type Props = {
  label: string;
  onClick: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const ButtonWithLabel: React.FC<Props> = props => {
  const {label, onClick, containerStyle, textStyle} = props;
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.buttonStyle, containerStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWithLabel;
