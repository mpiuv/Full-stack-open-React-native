import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import AppBar from './AppBar';
import theme from '../theme'
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackGround,
  },
});

const Main = ():React.JSX.Element => {
  return (
    <AppBar />    
  );

};

export default Main;