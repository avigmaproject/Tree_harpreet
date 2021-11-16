import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
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
import ParentComp from './src/Components/FamilyTree/AddDetailsComp/ParentComp';
import {dataObjectType} from './src/Components/FamilyTree/FamilyTreeComp';
import FamilyTree from './src/Components/FamilyTree/index';
import TextInputWithLabel from './src/Components/TextInputWithLabel';

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
    dob: string;
    dod: string | null;
  };
  motherText: {
    name: string;
    profile: string;
  };
};

export type editedTextChild = {
  childText: Omit<dataObjectType, 'children'>;
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
  const [levelSelected, setLevelSelected] = useState(0);
  const [maxLevel, setMaxLevel] = useState(1);

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
      case 'spouse':
        let temp: editedTextSpouse = handleSpouseDataChange(val);
        setEditedText({...temp});
        break;
      case 'child':
        break;
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
        profile:
          'https://images.unsplash.com/photo-1520206444322-d2df0dd4e78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        dob: '10/11/21',
        dod: null,
      };
    } else if (type === 'mother') {
      temp.motherText = {
        name: val,
        profile:
          'https://images.unsplash.com/photo-1520206444322-d2df0dd4e78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
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
          profile:
            'https://images.unsplash.com/photo-1520206444322-d2df0dd4e78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        },
      };
    } else {
      temp.spouseText.name = val;
    }
    return temp;
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FamilyTree
        data={SampleData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editedText={editedText}
        updateEditedText={setEditedText}
        isSubmitted={isSubmitted}
        updateIsSubmitted={setIsSubmitted}
        maxLevel={maxLevel}
        updateMaxLevel={setMaxLevel}
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
                  break;
                case 'child':
                  break;
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
                          {hasSpouse && <View style={styles.separatorStyle} />}
                        </>
                      )}
                      {hasSpouse && (
                        <TouchableOpacity
                          onPress={() => setIsEditing({type: 'child'})}>
                          <Text style={styles.optionsTextStyle}>Add Child</Text>
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
