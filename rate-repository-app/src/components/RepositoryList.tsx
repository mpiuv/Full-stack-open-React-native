import React, { useState, useEffect } from 'react';
import {  FlatList,View,StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
export const RepositoryListContainer = ({ repositories }:{repositories:any}) => {


  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge: { node: any; }) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item, index, separators}:{item:any, index:any, separators:any}) => (
        <RepositoryItem item={item}/>   
      )}
      keyExtractor={(item:any) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;