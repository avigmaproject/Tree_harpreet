import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChildComp from './src/Components/FamilyTree/AddDetailsComp/ChildComp';
import ParentComp from './src/Components/FamilyTree/AddDetailsComp/ParentComp';
import SpouseComp from './src/Components/FamilyTree/AddDetailsComp/SpouseComp';
import {dataObjectType} from './src/Components/FamilyTree/FamilyTreeComp';
import FamilyTree from './src/Components/FamilyTree/index';
import TextInputWithLabel from './src/Components/TextInputWithLabel';
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
  modalVisible?: boolean;
  selectedLevel?: number;
  hasSpouse?: boolean;
  type?: 'parent' | 'spouse' | 'child';
};

const App: React.FC = props => {
  const [isEditing, setIsEditing] = useState<isEditingType>({
    modalVisible: false,
    selectedLevel: -1,
    hasSpouse: false,
  });
  const [editedText, setEditedText] = useState<
    Partial<editedTextSpouse | editedTextParents | editedTextChild> | undefined
  >(undefined);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {modalVisible, selectedLevel, hasSpouse} = isEditing;

  const _onChangeText = (val: string, type: string | undefined) => {
    switch (isEditing.type) {
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
    console.log(parentData);
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
    } else setIsSubmitted(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FamilyTree
        data={SampleData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editedText={editedText}
        updateEditedText={setEditedText}
        isSubmitted={isSubmitted}
        updateIsSubmitted={setIsSubmitted}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setIsEditing({modalVisible: !modalVisible});
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            setIsEditing({modalVisible: !modalVisible});
          }}>
          <Pressable
            style={styles.modalView}
            onPress={() => {}}
            pointerEvents={isSubmitted ? 'none' : 'auto'}>
            {isEditing.type && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  marginHorizontal: 16,
                }}>
                <TouchableOpacity
                  onPress={() => setIsEditing({type: undefined})}>
                  <Image
                    source={require('./src/assets/back.png')}
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
            <View style={{paddingHorizontal: 48, paddingBottom: 32}}>
              {(() => {
                switch (isEditing.type) {
                  case 'parent':
                    return (
                      <ParentComp
                        _onChangeText={_onChangeText}
                        onSubmit={onSubmitParentData}
                      />
                    );
                  case 'spouse':
                    return (
                      <SpouseComp
                        _onChangeText={_onChangeText}
                        onSubmit={onSubmitSpouseData}
                      />
                    );
                  case 'child':
                    return (
                      <ChildComp
                        _onChangeText={_onChangeText}
                        onSubmit={onSubmitChildData}
                      />
                    );
                  default:
                    return (
                      <View>
                        {selectedLevel === 1 && (
                          <>
                            <TouchableOpacity
                              onPress={() => setIsEditing({type: 'parent'})}>
                              <Text style={styles.optionsTextStyle}>
                                Add Parent
                              </Text>
                            </TouchableOpacity>
                            <View style={styles.separatorStyle} />
                          </>
                        )}
                        {!hasSpouse && (
                          <>
                            <TouchableOpacity
                              onPress={() => setIsEditing({type: 'spouse'})}>
                              <Text style={styles.optionsTextStyle}>
                                Add Spouse
                              </Text>
                            </TouchableOpacity>
                            {hasSpouse && (
                              <View style={styles.separatorStyle} />
                            )}
                          </>
                        )}
                        {hasSpouse && (
                          <TouchableOpacity
                            onPress={() => setIsEditing({type: 'child'})}>
                            <Text style={styles.optionsTextStyle}>
                              Add Child
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    );
                }
              })()}
              {isSubmitted && (
                <ActivityIndicator
                  animating={true}
                  size="large"
                  style={styles.centerInView}
                />
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
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
  centerInView: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
  },
});

export default App;
