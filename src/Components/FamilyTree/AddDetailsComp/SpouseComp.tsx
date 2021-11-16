import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ButtonWithLabel from '../../ButtonWithLabel/ButtonWithLabel';
import TextInputWithLabel from '../../TextInputWithLabel';

export type Props = {
  _onChangeText: (val: string, type: string | undefined) => void;
  onSubmit: () => void;
};

const SpouseComp: React.FC<Props> = props => {
  const {_onChangeText, onSubmit} = props;
  return (
    <View>
      <TextInputWithLabel
        label="Enter Spouse Name"
        onChangeText={val => _onChangeText(val, undefined)}
      />
      <ButtonWithLabel label="Submit" onClick={onSubmit} />
    </View>
  );
};

export default SpouseComp;
