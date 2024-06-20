import React from 'react';
import {StyleSheet,TextInput} from 'react-native';
import {useField} from 'formik';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
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

const FormikTI = (props:{name:string, placeholder:string}):React.JSX.Element => {
  const [field, meta, helpers] = useField(props);
  const showError = meta.touched && meta.error;
  return (
    <>
      <TextInput
        onChangeText={(value:string) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={showError?styles.inputError:styles.input}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTI;