import { StyleSheet } from 'react-native';
import { Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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

const onSubmit = (values) => {
  console.log(values);
};

const UsernameAndPassword = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View>
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={formik.values.username}
      onChangeText={formik.handleChange('username')}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={formik.values.password}
      secureTextEntry={true}
      onChangeText={formik.handleChange('password')}
    />
    <Pressable onPress={formik.handleSubmit}>
      <Text style={styles.password}>Sign in</Text>
    </Pressable>
  </View>
  );
};

export default UsernameAndPassword;