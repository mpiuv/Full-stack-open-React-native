import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import Main from './src/components/Main';
import React from 'react';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const App = ():React.JSX.Element => {
  return ( <>
           <NativeRouter>
             <ApolloProvider client={apolloClient}>
               <AuthStorageContext.Provider value={authStorage}>
                 <Main/>
                </AuthStorageContext.Provider>
             </ApolloProvider>
           </NativeRouter>
         </>
        )

};

export default App;