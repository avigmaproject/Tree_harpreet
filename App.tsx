import React, {useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  type?: 'parent' | 'spouse' | 'child';
  selectedLevel?: number;
};

const App: React.FC = props => {
  const [isEditing, setIsEditing] = useState<isEditingType>({
    modalVisible: false,
    selectedLevel: -1,
  });
  const {selectedLevel} = isEditing;
  const [editedText, setEditedText] = useState<
    Partial<editedTextSpouse | editedTextParents | editedTextChild> | undefined
  >(undefined);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [levelSelected, setLevelSelected] = useState(0);
  const [maxLevel, setMaxLevel] = useState(1);
  const _onChangeText = (val: string, type: string | undefined) => {
    switch (isEditing.type) {
      case 'parent':
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
        setEditedText({...temp});
        break;
      case 'spouse':
        break;
      case 'child':
        break;
    }
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
        visible={isEditing.modalVisible}
        onRequestClose={() => {
          setIsEditing({modalVisible: !isEditing.modalVisible});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {(() => {
              switch (isEditing.type) {
                case 'parent':
                  return (
                    <>
                      <Text style={styles.modalText}>Hello World!</Text>
                      <TextInputWithLabel
                        label="enter father name"
                        onChangeText={val => _onChangeText(val, 'father')}
                        textInputStyle={{borderWidth: 1}}
                      />
                      <TextInputWithLabel
                        label="enter mother name"
                        onChangeText={val => _onChangeText(val, 'mother')}
                        textInputStyle={{borderWidth: 1}}
                      />
                      <TouchableOpacity onPress={() => setIsSubmitted(true)}>
                        <Text>Submit</Text>
                      </TouchableOpacity>
                    </>
                  );
                case 'spouse':
                  break;
                case 'child':
                  break;
                default:
                  return (
                    <View>
                      {selectedLevel === 1 && (
                        <TouchableOpacity
                          onPress={() => setIsEditing({type: 'parent'})}>
                          <Text>Add Parent</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity>
                        <Text>Add Spouse</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text>Add Child</Text>
                      </TouchableOpacity>
                    </View>
                  );
              }
            })()}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default App;
