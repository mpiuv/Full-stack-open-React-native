import React from 'react';
import { View} from 'react-native';
import UsernameAndPassword from './UsernameAndPassword';

const onSubmit = (values:string) => {
  console.log(values);
};

const SignIn = ():React.JSX.Element => {
  return <><View style={{bacgroundColor:'white'}}>
      <UsernameAndPassword  />
    </View></>;
};

export default SignIn;