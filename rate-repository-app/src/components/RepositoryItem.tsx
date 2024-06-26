import {  View, Image, Linking, StyleSheet,Pressable } from 'react-native';

import Text from './Text';
import React from 'react';
import theme from '../theme';
import { numToStr1 } from "../utils"

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    paddingTop: 20,
  },
  itemContainer: {
    marginLeft:10
  },
  languageContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  language: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
    flexGrow: 0,
    padding: 5,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  text: {
    backgroundColor:'blue',
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    paddingTop:20,
    paddingBottom:20,
    textAlign:"center",
  },
  tinyLogo: {
    height: 50,
    width: 50,
  },
});

const statisticsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
})

const RepositoryItem = ({item,github}:{item:any,github:boolean}):React.JSX.Element => {
  return (
  <View  style={styles.container}>
    <View style={styles.rowContainer}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://github.com/'+item.fullName.split('/')[0]+'.png',
        }}
      />
      <View  style={styles.itemContainer}>
        <Text testID="repositoryName" fontWeight = 'bold'>{item.fullName}</Text>
        <Text testID="repositoryDescription">{item.description}</Text>
        <View testID="repositoryLanguage" style={styles.languageContainer}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
    </View>
    <View  style={statisticsStyles.container}>
      <View styles={statisticsStyles.item}>
        <Text testID="stargazersCount" fontWeight = 'bold'>{numToStr1(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={statisticsStyles.item}>
        <Text testID="forksCount" fontWeight = 'bold'>{numToStr1(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={statisticsStyles.item}>
        <Text testID="reviewCount"fontWeight = 'bold'>{numToStr1(item.reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={statisticsStyles.item}>
        <Text testID="ratingAverage" fontWeight = 'bold'>{numToStr1(item.ratingAverage)}</Text>
        <Text>Rating</Text>
      </View>
    </View>
    {github && (
        <Pressable onPress={() => Linking.openURL(item.url)} >
        <Text fontWeight="bold" style={styles.text}>          Open in GitHub            </Text>
        </Pressable>
      )}
  </View>);
}

export default RepositoryItem