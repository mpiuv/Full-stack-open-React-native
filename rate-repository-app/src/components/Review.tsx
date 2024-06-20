import React from 'react';
import { View, StyleSheet,Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextInput from './TextInput';
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const styles = StyleSheet.create({
    container: { 
        backgroundColor: theme.colors.white, 
        padding: 10 },
    text: {
        backgroundColor:theme.colors.blue,
        color: "white",
        marginLeft: 10,
        marginRight: 10,
        paddingTop:20,
        paddingBottom:20,
        textAlign:"center",
      },
  });
  
  const ReviewForm = ({onSubmit}:{onSubmit:any}) => {
    return (
      <View style={styles.container}>
        <TextInput name="owner" placeholder="Repository owner name" />
        <TextInput name="name" placeholder="Repository name" />
        <TextInput name="rating" placeholder="Rating between 0 and 100" keyboardType='numeric' />
        <TextInput name="review" multiline={true} placeholder="Review" />
        <Pressable onPress={onSubmit}><Text fontWeight="bold" style={styles.text}> Create a review</Text></Pressable>
      </View>
    );
  };

const initialValues = {
  name: "",
  owner: "",
  rating: "",
  review: ""
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup.number().min(0, 'Rating must be at least 0').max(100, 'Rating higher than 100 is not allowed').required('Rating is required'),
  review: yup.string()
});


const Review = ():React.JSX.Element => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);
  
  const onSubmit = async ({ repositoryName, ownerName, text, rating1 }:{ repositoryName:string, ownerName:string, text:string, rating1:string }) => {
    const rating = Number(rating1);
    try {
      const { data } = await mutate({ variables: { repositoryName, ownerName, rating, text } });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;