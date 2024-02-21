import { View } from 'react-native';
import { JSX } from 'react';
import RepositoryList from './src/components/RepositoryList';
import Main from './src/components/Main';
import React from 'react';
const App = ():React.JSX.Element => {
  return (<View style={{backgroundColor:'#e1e4e8'}}>
           <Main/>
           <RepositoryList />
         </View>)
};

export default App;