import React, {Fragment, useRef} from 'react';
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
  updateEditedText: (val: editedTextType | undefined) => void;
  isSubmitted: boolean;
  updateIsSubmitted: (val: boolean) => void;
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
  } = props;

  const scrollViewRef = useRef(null);

  return (
    <Fragment>
      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <FamilyTreeComp
          data={data}
          title="Amit and Family"
          pathColor="#EAF7ED"
          loaderColor="#30AD4A"
          siblingGap={20}
          nodeStyle={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          familyGap={5}
          strokeWidth={2}
          titleColor="red"
          nodeTitleColor="black"
          nodeTitleStyle={{
            color: '#fff',
            borderWidth: 0,
          }}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editedText={editedText}
          updateEditedText={updateEditedText}
          isSubmitted={isSubmitted}
          updateIsSubmitted={updateIsSubmitted}
          scrollViewRef={scrollViewRef}
        />
      </ScrollView>
    </Fragment>
  );
};

export default FamilyTree;
