import { View } from 'react-native';
import { JSX } from 'react';
import RepositoryList from './src/components/RepositoryList';
import Main from './src/components/Main';
const App = ():JSX.Element => {
  return (<View>
         <Main/>
         <RepositoryList />
         </View>)
};

export default App;