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
  const isAuthenticated = !loading && data?.me;
    return (<><View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <Link key='repositories' to='/'><Text color="white" fontWeight="bold">Repositories </Text></Link>
    {isAuthenticated ?(<Link key='create-review' to="/review"><Text color="white" fontWeight="bold">Create a review </Text></Link>):<></>}
    {isAuthenticated ?(<Link key='my-reviews' to="/myreviews"><Text color="white" fontWeight="bold">My reviews </Text></Link>):<></>}
    {isAuthenticated ?(<Link key='sign-out' to='/' onPress={signOut}><Text color="white" fontWeight="bold">Sign Out </Text></Link>)
      :
      <><Link to='/signin'><Text color="white" fontWeight="bold">Sign in </Text></Link>
       <Link to="/sign-up"><Text color="white" fontWeight="bold">Sign up</Text></Link>
      </>
    }
    </ScrollView>
    </View>
    </>)

};

export default AppBar;