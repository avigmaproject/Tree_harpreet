import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ButtonWithLabel from '../../ButtonWithLabel/ButtonWithLabel';
import TextInputWithLabel from '../../TextInputWithLabel';
import RadioButtonRN from 'radio-buttons-react-native';

export type Props = {
  _onChangeText: (val: string, type: string | undefined) => void;
  onSubmit: () => void;
  setIsChildMale: (val: boolean) => void;
  onBackPress: () => void;
  isBackVisible: boolean;
};

export type radioData = {
  id: number;
  label: string;
};

const ChildComp: React.FC<Props> = props => {
  const data: Array<radioData> = [
    {
      id: 0,
      label: 'Male',
    },
    {
      id: 1,
      label: 'Female',
    },
  ];
  const {_onChangeText, onSubmit, setIsChildMale, onBackPress, isBackVisible} =
    props;
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
        label="Enter Child Name*"
        onChangeText={val => _onChangeText(val, 'child')}
      />
      <View>
        <Text>Child Gender: </Text>
        <RadioButtonRN
          data={data}
          box={false}
          circleSize={12}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
          boxStyle={{
            flex: 1,
            paddingLeft: 8,
            marginTop: 6,
          }}
          activeColor="hotpink"
          textStyle={{paddingLeft: 8}}
          selectedBtn={(e: radioData) =>
            setIsChildMale(e.id === 0 ? true : false)
          }
        />
      </View>
      <TextInputWithLabel
        label="Enter Spouse Name"
        onChangeText={val => _onChangeText(val, 'spouse')}
      />
      <ButtonWithLabel label="Submit" onClick={onSubmit} />
    </View>
  );
};

export default ChildComp;
