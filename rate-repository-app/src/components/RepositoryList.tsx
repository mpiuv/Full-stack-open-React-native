import React, { useEffect, useState} from 'react';
import {  FlatList,View,StyleSheet,Pressable, TextInput} from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import {Picker}  from '@react-native-picker/picker';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = ():React.JSX.Element => {return (<View style={styles.separator} />)};

/**
 * A component that renders a FlatList of RepositoryItems.
 *
 * @param {{
  *   header: React.ReactElement,
  * }} props
 * @returns {React.ReactElement} A FlatList of RepositoryItems
 */
const RepositoryListContainer = ({
  repositories,
  header,
  whilePressed,
}: {
  repositories: Array<{ node:any }> | null;
  header: React.ReactElement;
  whilePressed: (item: any) => void;
}): React.ReactElement => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge: { node: any }) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <Pressable onPress={() => { whilePressed(item) }}>
          <RepositoryItem item={item} github={false} />
        </Pressable>
      )}
      ListHeaderComponent={header}
      keyExtractor={(item) => item.id}
    />
  );
};

const orderingOptions = {
  latest: {
    label: 'Lastest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRated: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRated: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryList = (): React.JSX.Element => {
  const orderOptions = [
    { label: 'Latest repositories', value: 'latest' },
    { label: 'Highest rated repositories', value: 'highest' },
    { label: 'Lowest rated repositories', value: 'lowest' }
  ];

  const [ordering, setOrdering] = useState<string>(orderOptions[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [debouncedText] = useDebounce(searchKeyword, 500);
  
  const getOrderBy = (value: string | null | undefined): { orderBy: string; orderDirection: string } => {
    if (value === null || value === undefined) {
      throw new Error('value is null or undefined');
    }
    switch (value) {
      case 'highest':
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case 'lowest':
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  };

  const ordering1 = getOrderBy(ordering);
  const data =  useRepositories(ordering1, debouncedText.text);
  if (!data) {
    // Handle error, show message, or fallback logic
    return <Text>Error: Failed to fetch data</Text>;
  }
  const repositories=data.repositories
  
  const navigate = useNavigate();

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        fontSize: 20,
        marginBottom: 10,
    }
});

  return(
    <RepositoryListContainer  repositories={repositories} whilePressed={(item: { id:string, node:any })=> navigate(`/${item.id}`)} header={
      <View style={styles.container}>
        <TextInput
          value={searchKeyword}
          defaultValue={""}
          onChangeText={(text:string) => setSearchKeyword({text})}
      />
      <Picker selectedValue={orderOptions.find(option => option.value === ordering)?.value} onValueChange={(value) => setOrdering(value)}>
      {orderOptions.map((key) => (
        <Picker.Item
          key={key.label}
          label={key.label}
          value={key.value}
        ></Picker.Item>
      ))}
      </Picker>
      </View>
    } />
  );}

export default RepositoryList