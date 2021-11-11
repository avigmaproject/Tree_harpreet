import React, {Fragment} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import FamilyTreeComp, {dataObjectType} from './FamilyTreeComp';

export type Props = {
  data: Array<dataObjectType>;
};

const FamilyTree: React.FC<Props> = props => {
  const {data} = props;

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
        />
      </ScrollView>
    </Fragment>
  );
};

export default FamilyTree;
