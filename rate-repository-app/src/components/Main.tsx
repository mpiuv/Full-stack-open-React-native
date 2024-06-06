import Constants from 'expo-constants';
import { StyleSheet,View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import AppBar from './AppBar';
import theme from '../theme'
import React from 'react';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import Review from './Review';
import SingleRepository from './SingleRepository';

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
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/review" element={<Review />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
    </>
  );

};

export default Main;