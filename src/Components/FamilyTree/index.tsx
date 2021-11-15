import React, {Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {
  editedTextChild,
  editedTextParents,
  editedTextSpouse,
  isEditingType,
} from '../../../App';
import FamilyTreeComp, {dataObjectType} from './FamilyTreeComp';

export type editedTextType =
  | editedTextParents
  | editedTextSpouse
  | editedTextChild;

export type Props = {
  data: Array<dataObjectType>;
  isEditing: isEditingType;
  setIsEditing: (val: isEditingType) => void;
  editedText: Partial<editedTextType> | undefined;
  updateEditedText: (val: editedTextType) => void;
  isSubmitted: boolean;
  updateIsSubmitted: (val: boolean) => void;
  maxLevel: number;
  updateMaxLevel: (val: number) => void;
};

const FamilyTree: React.FC<Props> = props => {
  const {
    data,
    isEditing,
    setIsEditing,
    editedText,
    updateEditedText,
    isSubmitted,
    updateIsSubmitted,
    maxLevel,
    updateMaxLevel,
  } = props;

  return (
    <Fragment>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FamilyTreeComp
          data={data}
          title="Amit and Family"
          pathColor="#7C7C7E"
          siblingGap={20}
          nodeStyle={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          familyGap={5}
          strokeWidth={5}
          titleColor="red"
          nodeTitleColor="black"
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editedText={editedText}
          updateEditedText={updateEditedText}
          isSubmitted={isSubmitted}
          updateIsSubmitted={updateIsSubmitted}
          maxLevel={maxLevel}
          updateMaxLevel={updateMaxLevel}
        />
      </ScrollView>
    </Fragment>
  );
};

export default FamilyTree;
