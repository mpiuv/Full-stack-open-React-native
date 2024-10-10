import Constants from 'expo-constants';
import { StyleSheet,View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import AppBar from './AppBar';
import theme from '../theme';
import React from 'react';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import SingleRepository from './SingleRepository';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles1 = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackGround,
  },
});

const Main = ():React.JSX.Element => {
  return (<>
    <View style={styles1.container}>
      <AppBar/>
    </View>
    <View>
      <Routes>
        <Route path="/" element={<RepositoryList />} key="repositoryList" />
        <Route path="/signin" element={<SignIn />} key="signIn"/>
        <Route path="/sign-up" element={<SignUp/>} key="signUp"/>
        <Route path="/myreviews" element={<MyReviews />} key="myReviews"/>
        <Route path="/review" element={<CreateReview  />} key="review"/>
        <Route path="/:id" element={<SingleRepository  />} key="singleRepository"/>
        <Route path="*" element={<Navigate to="/" replace />}key="navigate"/>
      </Routes>
    </View>
    </>
  );

};

export default Main;