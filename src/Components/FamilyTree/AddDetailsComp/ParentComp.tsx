import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import ButtonWithLabel from '../../ButtonWithLabel/ButtonWithLabel';
import TextInputWithLabel from '../../TextInputWithLabel';

type parentTextType = 'father' | 'mother';

export type Props = {
  _onChangeText: (val: string, type: parentTextType) => void;
  onSubmit: () => void;
  onBackPress: () => void;
  isBackVisible: boolean;
};

const ParentComp: React.FC<Props> = props => {
  const {_onChangeText, onSubmit, onBackPress, isBackVisible} = props;
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
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
              <Text style={{fontSize: 18, fontWeight: '700'}}>
                Enter Details
              </Text>
            </View>
          </View>
        )}
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
    </TouchableWithoutFeedback>
  );
};

export default ParentComp;
