import { useField, useFormik } from 'formik';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({  
  errorText: {
  marginTop: 5,
  color: theme.colors.error,
},
  inputError:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#d73a4a'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'black'
  },
});

const TextInput = ({ style, error, name,  ...props }:{name:string, style:any, error:string}) => {
  const formik = useFormik({});
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return <>
    <NativeTextInput style={formik.errors.name?styles.inputError:styles.input} 
    onChangeText={(value:any) => helpers.setValue(value)}
    onBlur={() => helpers.setTouched(true)}
    value={field.value}
    error={showError}
    {...props} />
  </>
};
export default TextInput;