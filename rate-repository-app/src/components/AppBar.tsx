import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBackGround,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row"
    // ...
  },
  // ...
});

const AppBar = ():React.JSX.Element => {
  return (<><View style={styles.container}>
    <Link to='/'><Text color="white" fontWeight="bold">Repositories </Text></Link>
    <Link to='/signin'><Text color="white" fontWeight="bold">Sign In </Text></Link>
    </View>
    </>)

};

export default AppBar;