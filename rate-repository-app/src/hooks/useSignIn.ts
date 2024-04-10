import { gql, useApolloClient, useMutation } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const AUTHENTICATE = gql`mutation authenticationMutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
  `;

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const signIn = async ({ username, password }:{username:string, password:string}) => {
    const res=await mutate({variables:{credentials: { username, password }}})
    if(res){
      await authStorage.setAccessToken(res.data?.authenticate?.accessToken)
      apolloClient.resetStore()
    }
      return res
    };
  return [signIn, result];
};    

export default useSignIn
