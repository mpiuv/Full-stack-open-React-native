import { View } from 'react-native';
import { JSX } from 'react';
import RepositoryList from './src/components/RepositoryList';
const App = ():JSX.Element => {
  return (<View>
            <RepositoryList />
         </View>)
};

export default App;