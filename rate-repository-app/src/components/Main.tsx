import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Rate Repository Application</Text>
    </SafeAreaView>
  );
};

export default Main;