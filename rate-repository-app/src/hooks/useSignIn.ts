import { gql, useMutation } from '@apollo/client';

const AUTHENTICATE = gql`mutation authenticationMutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
  `;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const signIn = async ({ username, password }:{username:string, password:string}) => {
    const res=await mutate({variables:{credentials: { username, password }}})
    return res
  };
  return [signIn, result];
};    

export default useSignIn
