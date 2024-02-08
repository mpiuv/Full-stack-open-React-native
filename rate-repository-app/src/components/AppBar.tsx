import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBackGround,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    // ...
  },
  // ...
});

const AppBar = ():JSX.Element => {
  return (<Pressable onPress={()=>{}}>
    <View style={styles.container}><Text color="white" fontWeight="bold">Repositories </Text></View></Pressable>)

};

export default AppBar;