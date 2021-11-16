import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ButtonWithLabel from '../../ButtonWithLabel/ButtonWithLabel';
import TextInputWithLabel from '../../TextInputWithLabel';

type parentTextType = 'father' | 'mother';

export type Props = {
  _onChangeText: (val: string, type: parentTextType) => void;
  onSubmit: () => void;
};

const ParentComp: React.FC<Props> = props => {
  const {_onChangeText, onSubmit} = props;
  return (
    <View>
      <TextInputWithLabel
        label="Enter Father Name"
        onChangeText={val => _onChangeText(val, 'father')}
      />
      <TextInputWithLabel
        label="Enter Mother Name"
        onChangeText={val => _onChangeText(val, 'mother')}
      />
      <ButtonWithLabel label="Submit" onClick={onSubmit} />
    </View>
  );
};

export default ParentComp;
