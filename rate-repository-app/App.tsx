import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';
import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Constants from "expo-constants"
const client = new ApolloClient({
  uri: Constants.expoConfig.extra.APOLLO_URI, cache: new InMemoryCache()
});
const App = ():React.JSX.Element => {
  return ( <>
           <NativeRouter>
             <ApolloProvider client={client}>
               <Main/>
             </ApolloProvider>
           </NativeRouter>
         </>
        )

};

export default App;