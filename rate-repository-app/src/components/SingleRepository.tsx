import {FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import { format } from 'date-fns'
import { Card } from '@rneui/themed';
import theme from '../theme'
import { useParams } from 'react-router-native';
import React from 'react';

const ratingDimension = 40;
const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    margin: 10,
  },
  listHeader: {
    marginBottom: 20,
  },
  author: {
    marginBottom: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: ratingDimension / 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    display: 'flex',
    height: ratingDimension,
    justifyContent: 'center',
    marginEnd: 15,
    fontWeight:'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: ratingDimension,
  },
  separator: {
    height: 10,
  },

});

const ARepository = ({repository}:{repository:any}):React.JSX.Element => {
  return <RepositoryItem item={repository} github={true}/>;
};

export const ReviewItem = ({ review }:{review:any}):React.JSX.Element => {
  return (
  <Card >
  <View style={{flexDirection: 'row', }}> 
    <View>
      <Text style={styles.rating}>
        {review.node.rating}
      </Text>
    </View>
    <View style={{ flexShrink: 1,flexDirection: 'column', }}>
      <View  style={styles.author}>
        <Text fontWeight = 'bold'>{review.node.user.username}</Text>
        <Text secondary>{format(new Date(review.node.createdAt),'dd.MM.yyyy')}</Text>
      </View>
        <Text>{review.node.text}</Text>
     </View>
   </View>
</Card>)
};

export const ReviewItemForUser = ({ review }:{review:any}):React.JSX.Element => {
  return (
  <Card >
  <View style={{flexDirection: 'row', }}> 
    <View>
      <Text style={styles.rating}>
        {review.rating}
      </Text>
    </View>
    <View style={{ flexShrink: 1,flexDirection: 'column', }}>
      <View  style={styles.author}>
        <Text fontWeight = 'bold'>{review.repository.fullName}</Text>
        <Text secondary>{format(new Date(review.createdAt),'dd.MM.yyyy')}</Text>
      </View>
        <Text>{review.text}</Text>
     </View>
   </View>
</Card>)
};

const SingleRepository = ():React.JSX.Element => {
  const {id} = useParams();
  const {data, error} = useQuery(GET_REPOSITORY, {variables:{id}});
  if (error) {
    console.error(`Error fetching repository data: ${error.message}`);
    return <Text>Error fetching data</Text>;
  }
  if (!data)  return <></>;
  const repository=data.repository;
  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item}:{item:string }) => <ReviewItem review={item} />}
      keyExtractor={({ id }:{id:string }) => id}
      ListHeaderComponent={() => <ARepository repository={repository} />}
      ListEmptyComponent={() => <Text>No reviews available</Text>}
    />
  );
};

export default SingleRepository;