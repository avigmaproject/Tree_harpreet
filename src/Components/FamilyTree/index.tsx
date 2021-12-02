import React, {Fragment, useRef} from 'react';
import {ScrollView} from 'react-native';
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
  editedText: Partial<editedTextType> | undefined;
  isChildMale?: boolean;
  updateEditedText: (val: editedTextType | undefined) => void;
  isSubmitted: boolean;
  updateIsSubmitted: (val: boolean) => void;
  optionsVisibility: isEditingType;
  updateOptionsVisibility: (val: isEditingType) => void;
  updateProfilePic: (val: string) => void;
};

const FamilyTree: React.FC<Props> = props => {
  const {
    data,
    editedText,
    isChildMale,
    updateEditedText,
    isSubmitted,
    updateIsSubmitted,
    optionsVisibility,
    updateOptionsVisibility,
    updateProfilePic,
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
            marginBottom: 6,
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
          isEditing={optionsVisibility}
          setIsEditing={updateOptionsVisibility}
          editedText={editedText}
          isChildMale={isChildMale}
          updateEditedText={updateEditedText}
          isSubmitted={isSubmitted}
          updateIsSubmitted={updateIsSubmitted}
          scrollViewRef={scrollViewRef}
          updateProfilePic={updateProfilePic}
        />
      </ScrollView>
    </Fragment>
  );
};

export default FamilyTree;
