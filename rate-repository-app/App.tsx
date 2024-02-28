import { View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import RepositoryList from './src/components/RepositoryList';
import Main from './src/components/Main';
import React from 'react';
const App = ():React.JSX.Element => {
  return ( <>
           <NativeRouter>
           <Main/>
           </NativeRouter>
         </>
        )
//        <View style={{backgroundColor:'#e1e4e8'}}>
//</View>


};

export default App;