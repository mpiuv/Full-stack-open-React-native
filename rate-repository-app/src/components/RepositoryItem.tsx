import {  Text, View } from 'react-native';

const RepositoryItem = ({item}:{item:any}):JSX.Element => {
  return <View style={{ backgroundColor: 'white' }}>
    <Text>Full Name: {item.fullName}</Text>
    <Text>Description: {item.description}</Text>
    <Text>Language: {item.language}</Text>
    <Text>Stars: {item.stargazersCount}</Text>
    <Text>Forks: {item.forksCount}</Text>
    <Text>Reviews: {item.reviewCount}</Text>
    <Text>Rating: {item.ratingAverage}</Text>
  </View>;
}

export default RepositoryItem