import {  View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import React from 'react';
import theme from '../theme';
import { numToStr1 } from "../utils"

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor:'white'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    marginLeft:10
  },
  languageContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  language: {
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
  },
});

const statisticsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  item: {
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
})

const RepositoryItem = ({item}:{item:any}):React.JSX.Element => {
  return <View style={styles.container}>
    <View style={styles.rowContainer}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://github.com/'+item.fullName.split('/')[0]+'.png',
        }}
      />
      <View style={styles.itemContainer}>
        <Text fontWeight = 'bold'>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
    </View>
    <View style={statisticsStyles.container}>
      <View styles={statisticsStyles.item}>
        <Text fontWeight = 'bold'>{numToStr1(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={statisticsStyles.item}>
        <Text fontWeight = 'bold'>{numToStr1(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={statisticsStyles.item}>
        <Text fontWeight = 'bold'>{numToStr1(item.reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={statisticsStyles.item}>
        <Text fontWeight = 'bold'>{numToStr1(item.ratingAverage)}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>;
}

export default RepositoryItem