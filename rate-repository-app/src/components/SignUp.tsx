import React from 'react';
import * as yup from 'yup';
import {Formik, FormikHelpers, getIn, useFormikContext} from 'formik';
import FormikTI from './FormikTI';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-native';
import {View, StyleSheet, Pressable, TextInput} from 'react-native';
import Text from './Text'
import useSignIn from '../hooks/useSignIn';
import {CREATE_USER} from '../graphql/mutations';
import theme from '../theme';

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: ""
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Maximum length of username is 30 characters')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be at least 5 character')
    .max(50, 'Maximum length of password is 50 characters')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), undefined], 'Passwords do not match')
    .required('Password confirmation is required')
});

const styles = StyleSheet.create({
    container: { backgroundColor: theme.colors.white, padding: 20 },
    signup: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'blue',
      color:'white',
      textAlign:'center',
      fontWeight: "bold"
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'black'
    },
    inputError: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: theme.colors.error
    },
  });
  
  const SignUpForm = ({ onSubmit }:{onSubmit:any}):React.JSX.Element => {
    return (
      <>
      <View style={styles.container}>
        <FormikTI name="username" placeholder="Username" />
        <FormikTI name="password" placeholder="Password" secureTextEntry />
        <FormikTI name="passwordConfirm" placeholder="Confirm password" secureTextEntry />
        <Pressable onPress={onSubmit}><Text style={styles.signup}>Sign up</Text></Pressable>
      </View>
      </>
    );
  };

const SignUp = ():React.JSX.Element => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async (values:{username:string,password:string}, formikHelpers:FormikHelpers<{username:string,password:string}> ) => {
    const {username, password} = values;
    try {
      await createUser({variables: {username, password}});
      await signIn({username, password});
      navigate('/');
    } catch (err) {
      console.log(err);
 
      formikHelpers.setFieldError('username', 'Username is required');
      formikHelpers.setFieldError('password','Password is required');
      formikHelpers.setFieldError('passwordConfirm','Password confirmation is required');
      formikHelpers.setFieldValue('username','');
      formikHelpers.setFieldValue('password','');
      formikHelpers.setFieldValue('passwordConfirm','');
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
      {({handleSubmit}) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;