import React from 'react';
import {TextInput, StyleProp, TextStyle} from 'react-native';

export type Props = {
  label: string;
  textInputStyle: StyleProp<TextStyle>;
  onChangeText: (val: string) => void;
};

const TextInputWithLabel: React.FC<Props> = props => {
  const {label, textInputStyle, onChangeText} = props;
  return (
    <TextInput
      placeholder={label}
      style={textInputStyle}
      onChangeText={onChangeText}
    />
  );
};

export default TextInputWithLabel;
