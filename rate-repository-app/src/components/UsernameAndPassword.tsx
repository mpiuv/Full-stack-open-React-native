import { StyleSheet } from 'react-native';
import { Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
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
    borderColor: '#d73a4a'
  },
  password: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'blue',
    color:'white',
    textAlign:'center',
    fontWeight: "bold"
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const UsernameAndPassword = () => {
  const [signIn,result] = useSignIn()
  const navigate=useNavigate()

  const onSubmit = async (values: any) => {
    const { username, password } = values
    try {
      const { data } = await signIn({ username, password });
      //console.log(data);
      if (data.authenticate.accessToken) {
        navigate("/")
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  return (
    <View>
    <TextInput style={formik.errors.username?styles.inputError:styles.input}
      placeholder="Username"
      value={formik.values.username}
      onChangeText={formik.handleChange('username')}
    />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
    <TextInput style={formik.errors.password?styles.inputError:styles.input}
      placeholder="Password"
      value={formik.values.password}
      secureTextEntry={true}
      onChangeText={formik.handleChange('password')}
    />
    {formik.touched.password && formik.errors.password && (
      <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
    )}
    <Pressable onPress={formik.handleSubmit}>
      <Text style={styles.password}>Sign in</Text>
    </Pressable>
  </View>
  );
};

export const UsernameAndPasswordContainer = ({onSubmit}:{onSubmit:any}) =>{
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
    <TextInput style={formik.errors.username?styles.inputError:styles.input}
      placeholder="Username"
      testID="username"
      value={formik.values.username}
      onChangeText={formik.handleChange('username')}
    />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
    <TextInput style={formik.errors.password?styles.inputError:styles.input}
      placeholder="Password"
      testID="password"
      value={formik.values.password}
      secureTextEntry={true}
      onChangeText={formik.handleChange('password')}
    />
    {formik.touched.password && formik.errors.password && (
      <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
    )}
    <Pressable onPress={formik.handleSubmit}>
      <Text style={styles.password}>Sign in</Text>
    </Pressable>
  </View>
  );
  }

export default UsernameAndPassword ;