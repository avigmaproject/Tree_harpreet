import React from 'react';
import {View} from 'react-native';
import ButtonWithLabel from '../../ButtonWithLabel/ButtonWithLabel';
import TextInputWithLabel from '../../TextInputWithLabel';

export type Props = {
  _onChangeText: (val: string, type: string | undefined) => void;
  onSubmit: () => void;
};

const ChildComp: React.FC<Props> = props => {
  const {_onChangeText, onSubmit} = props;
  return (
    <View>
      <TextInputWithLabel
        label="Enter Child Name"
        onChangeText={val => _onChangeText(val, 'child')}
      />
      <TextInputWithLabel
        label="Enter Spouse Name"
        onChangeText={val => _onChangeText(val, 'spouse')}
      />
      <ButtonWithLabel label="Submit" onClick={onSubmit} />
    </View>
  );
};

export default ChildComp;
