import React from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import {  Formik, useField } from "formik";
import * as yup from "yup";
import theme from "../theme";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  text: {
    backgroundColor: theme.colors.blue,
    color: "white",
    margin: 10,
    paddingVertical: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
  },
  errorText: {
    marginTop: -5,
    marginHorizontal: 10,
    color: theme.colors.red,
  },
});
export const CreateReview = () => {

  const FormikTextInput = ({ name, placeholder,onChangeText, ...props }:{name:string,placeholder:string,onChangeText:any}) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
  
    return (
      <>
        <TextInput
          onChangeText={onChangeText}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          style={styles.input}
          placeholder={placeholder}
          {...props}
        />
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      </>
    );
  };
    
  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner name is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
      .number()
      .min(0, "Rating must be at least 0")
      .max(100, "Rating higher than 100 is not allowed")
      .required("Rating is required"),
    review: yup.string(),
  });
  const navigate = useNavigate();
  const [mutate, { error }] = useMutation<{ 
    createReview: { repositoryId: string } },
    {
      review: {
        repositoryName: string;
        ownerName: string;
        rating: number;
        text: string;
      };
    }
  >(CREATE_REVIEW);
  if (error) {
    console.error(error);
  }

  return (
    <Formik
      initialValues={{ repositoryName: "", ownerName: "", rating: "", review: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const ratingValue = Number(values.rating);
        if (isNaN(ratingValue)) {
          console.error("Rating must be a valid number: " + values.rating);
          return;
        }

        try {
          const { data } = await mutate({
            variables: {
              repositoryName: values.repositoryName,
              ownerName: values.ownerName,
              rating: ratingValue,
              text: values.review,
            }}
          );
          navigate(`/repository/${data?.createReview.repositoryId}`);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name"
            onChangeText={handleChange("ownerName")}
          />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            onChangeText={handleChange("repositoryName")}
          />
          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            onChangeText={handleChange("rating")}
            keyboardType="numeric"
          />
          <FormikTextInput
            name="review"
            multiline={true}
            placeholder="Review"
            onChangeText={handleChange("review")}
          />
          <Button onPress={handleSubmit} title="Create a review"></Button>
        </View>
      )}
    </Formik>
  );
};
export default CreateReview;
