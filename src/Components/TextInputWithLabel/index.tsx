import React from 'react';
import {
  TextInput,
  StyleProp,
  TextStyle,
  StyleSheet,
  View,
  KeyboardTypeOptions,
} from 'react-native';

export type Props = {
  label: string;
  textInputStyle?: StyleProp<TextStyle>;
  onChangeText: (val: string) => void;
  type?: KeyboardTypeOptions;
};

const TextInputWithLabel: React.FC<Props> = props => {
  const {label, textInputStyle, onChangeText, type} = props;
  return (
    <View>
      <TextInput
        placeholder={label}
        style={[styles.textInputStyle, textInputStyle]}
        onChangeText={onChangeText}
        keyboardType={type ?? 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default TextInputWithLabel;
