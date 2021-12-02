import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import AddOptionsModal from './src/Components/FamilyTree/AddOptionsModal';
import FamilyTree from './src/Components/FamilyTree/index';
import {profileUrl} from './src/constants/constants';

const SampleData = require('./src/assets/sample.json');

export type editedTextSpouse = {
  spouseText: {
    name: string;
    profile: string;
  };
};

export type editedTextParents = {
  fatherText: {
    name: string;
    profile: string;
  };
  motherText: {
    name: string;
    profile: string;
  };
};

export type editedTextChild = {
  childText: {
    name: string;
    profile: string;
  };
  spouseText: {
    name: string;
    profile: string;
  };
};

export type isEditingType = {
  modalVisible: boolean;
  selectedLevel?: number;
  hasSpouse?: boolean;
  type?: 'parent' | 'spouse' | 'child';
};

const App: React.FC = props => {
  const [optionsVisibilty, setOptionsVisibilty] = useState<isEditingType>({
    modalVisible: false,
    selectedLevel: -1,
    hasSpouse: false,
    type: undefined,
  });
  const [profilePic, setProfilePic] = useState<string>();
  const [editedText, setEditedText] = useState<
    Partial<editedTextSpouse | editedTextParents | editedTextChild> | undefined
  >(undefined);
  const [isChildMale, setIsChildMale] = useState<boolean>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {selectedLevel, hasSpouse = false} = optionsVisibilty;

  const _onChangeText = (val: string, type: string | undefined) => {
    switch (optionsVisibilty.type) {
      case 'parent': {
        let temp: Partial<editedTextParents> = handleParentDataChange(
          type,
          val,
        );
        setEditedText({...temp});
        break;
      }
      case 'spouse': {
        let temp: editedTextSpouse = handleSpouseDataChange(val);
        setEditedText({...temp});
        break;
      }
      case 'child': {
        let temp: editedTextChild = handleChildDataChange(val, type);
        setEditedText({...temp});
        break;
      }
    }
  };

  const handleParentDataChange = (
    type: string | undefined,
    val: string,
  ): Partial<editedTextParents> => {
    let temp: Partial<editedTextParents> = {
      ...(editedText as editedTextParents),
    };
    if (type === 'father') {
      temp.fatherText = {
        name: val,
        profile: profileUrl,
      };
    } else if (type === 'mother') {
      temp.motherText = {
        name: val,
        profile: profileUrl,
      };
    }
    return temp;
  };

  const handleSpouseDataChange = (val: string): editedTextSpouse => {
    let temp: editedTextSpouse = {
      ...(editedText as editedTextSpouse),
    };
    if (temp.spouseText === undefined) {
      temp = {
        spouseText: {
          name: val,
          profile: profileUrl,
        },
      };
    } else {
      temp.spouseText.name = val;
    }
    return temp;
  };

  const handleChildDataChange = (
    val: string,
    type?: string,
  ): editedTextChild => {
    let temp: Partial<editedTextChild> = {
      ...(editedText as editedTextChild),
    };
    if (type === 'child') {
      temp.childText = {
        name: val,
        profile: profileUrl,
      };
    } else if (type === 'spouse') {
      temp.spouseText = {
        name: val,
        profile: profileUrl,
      };
    }
    return temp as editedTextChild;
  };

  const onSubmitSpouseData = () => {
    let regex = /[a-zA-Z]/g;
    let spouseData = editedText as editedTextSpouse;
    if (editedText === undefined) {
      Alert.alert('Please fill data!');
      return;
    } else if (spouseData.spouseText && spouseData.spouseText.name === '') {
      Alert.alert('Please fill data!');
      return;
    } else if (!regex.test(spouseData.spouseText.name)) {
      Alert.alert('Please fill data!');
      return;
    } else {
      setIsSubmitted(true);
    }
  };

  const onSubmitParentData = () => {
    let regex = /[a-zA-Z]/g;
    let parentData = editedText as editedTextParents;
    if (editedText === undefined) {
      Alert.alert('Please fill data!');
      return;
    } else if (!parentData.fatherText || !parentData.motherText) {
      Alert.alert('Please fill data!');
      return;
    }
    if (
      !regex.test(parentData.fatherText.name) ||
      !regex.test(parentData.motherText.name)
    ) {
      Alert.alert('Please fill data!');
      return;
    } else setIsSubmitted(true);
  };

  const onSubmitChildData = () => {
    let regex = /[a-zA-Z]/g;
    let childData = editedText as editedTextChild;
    if (editedText === undefined) {
      Alert.alert('Please fill data!');
      return;
    } else if (!childData.childText) {
      Alert.alert('Please fill data!');
      return;
    } else if (childData.spouseText !== undefined) {
      if (
        !regex.test(childData.spouseText.name) &&
        childData.spouseText.name !== ''
      ) {
        Alert.alert('Please fill data!');
        return;
      } else if (!regex.test(childData.childText.name)) {
        Alert.alert('Please fill data!');
        return;
      } else setIsSubmitted(true);
    }
    if (!regex.test(childData.childText.name)) {
      Alert.alert('Please fill data!');
      return;
    } else if (isChildMale === undefined) {
      Alert.alert('Please fill data!');
      return;
    } else setIsSubmitted(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#DAE6E4'}}>
      <FamilyTree
        data={SampleData}
        editedText={editedText}
        isChildMale={isChildMale}
        updateEditedText={setEditedText}
        isSubmitted={isSubmitted}
        updateIsSubmitted={setIsSubmitted}
        optionsVisibility={optionsVisibilty}
        updateOptionsVisibility={setOptionsVisibilty}
        updateProfilePic={setProfilePic}
      />
      <AddOptionsModal
        visibleObject={optionsVisibilty}
        updateVisibility={setOptionsVisibilty}
        isParentActive={selectedLevel === 1}
        isSpouseActive={!hasSpouse}
        isChildActive={hasSpouse}
        _onChangeText={_onChangeText}
        onSubmitParentData={onSubmitParentData}
        onSubmitSpouseData={onSubmitSpouseData}
        onSubmitChildData={onSubmitChildData}
        setIsChildMale={setIsChildMale}
        isSubmitted={isSubmitted}
        profilePic={profilePic}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  separatorStyle: {
    height: 0.5,
    backgroundColor: '#000',
    marginHorizontal: '1%',
    marginVertical: 4,
  },
  optionsTextStyle: {
    textAlign: 'center',
    color: '#008aeb',
  },
});

export default App;
