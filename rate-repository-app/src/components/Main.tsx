import Constants from 'expo-constants';
import { StyleSheet,View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import theme from '../theme'
import React from 'react';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackGround,
  },
});

const Main = ():React.JSX.Element => {
  return (<><View style={styles.container}>
    <AppBar />    
    </View>
    <View>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
    </>
  );

};

export default Main;