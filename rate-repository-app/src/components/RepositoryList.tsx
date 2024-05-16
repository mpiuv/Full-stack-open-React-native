import React, { useState, useEffect } from 'react';
import {  FlatList,View,StyleSheet,Pressable  } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, whilePressed }:{repositories:any,whilePressed:any}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map((edge: { node: any; }) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item, index, separators}:{item:any, index:any, separators:any}) => (
        <Pressable onPress={() => {whilePressed(item)}}>
          <RepositoryItem item={item} github={false}/>   
        </Pressable>
      )}
      keyExtractor={(item:any) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();
  return <RepositoryListContainer repositories={repositories} whilePressed={(item: { id: any; }) => navigate(`/${item.id}`)} />;
};

export default RepositoryList;