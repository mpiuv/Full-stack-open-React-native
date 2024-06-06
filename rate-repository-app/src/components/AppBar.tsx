import { View, StyleSheet, ScrollView,Pressable } from 'react-native';
import Constants from 'expo-constants';
import React from 'react';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import useSignOut from "../hooks/useSignOut"

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
  const { signOut, data, loading } = useSignOut()

  return (<><View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <Link to='/'><Text color="white" fontWeight="bold">Repositories </Text></Link>
    {!loading && data.me ?(<Link to="/review"><Text color="white" fontWeight="bold">Create a review </Text></Link>):<></>}
    {!loading && data.me ? 
      (<Link to='/' onPress={signOut}><Text color="white" fontWeight="bold">Sign Out </Text></Link>)
      :
      (<Link to='/signin'><Text color="white" fontWeight="bold">Sign In </Text></Link>)
    }
    </ScrollView>
    </View>
    </>)

};

export default AppBar;