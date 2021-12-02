import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ButtonWithLabel from '../../ButtonWithLabel/ButtonWithLabel';
import TextInputWithLabel from '../../TextInputWithLabel';

export type Props = {
  _onChangeText: (val: string, type: string | undefined) => void;
  onSubmit: () => void;
  onBackPress: () => void;
  isBackVisible: boolean;
};

const SpouseComp: React.FC<Props> = props => {
  const {_onChangeText, onSubmit, onBackPress, isBackVisible} = props;
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 24,
        borderRadius: 10,
      }}>
      {isBackVisible && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={onBackPress}>
            <Image
              source={require('../../../assets/back.png')}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <View style={{marginLeft: '10%'}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Enter Details</Text>
          </View>
        </View>
      )}
      <TextInputWithLabel
        label="Enter Spouse Name"
        onChangeText={val => _onChangeText(val, undefined)}
      />
      <ButtonWithLabel label="Submit" onClick={onSubmit} />
    </View>
  );
};

export default SpouseComp;
