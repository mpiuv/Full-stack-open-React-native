import Constants from 'expo-constants';
import { StyleSheet,View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import AppBar from './AppBar';
import theme from '../theme'
import React from 'react';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackGround,
  },
});

const ARepository = ():React.JSX.Element => {
  const {id} = useParams();
  const {data} = useQuery(GET_REPOSITORY, {variables:{id}});
  if (!data)  return <></>;
  const repository=data.repository;
  return <RepositoryItem item={repository} github={true}/>;
};

const Main = ():React.JSX.Element => {
  return (<>
    <View style={styles.container}>
      <AppBar/>
    </View>
    <View>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:id" element={<ARepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
    </>
  );

};

export default Main;