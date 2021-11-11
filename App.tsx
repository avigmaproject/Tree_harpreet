import React from 'react';
import {SafeAreaView} from 'react-native';
import FamilyTree from './src/Components/FamilyTree/index';

const SampleData = require('./src/assets/sample.json');

const App: React.FC = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FamilyTree data={SampleData} />
    </SafeAreaView>
  );
};

export default App;
