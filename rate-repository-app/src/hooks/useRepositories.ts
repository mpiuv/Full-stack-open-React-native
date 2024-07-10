import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = ({ orderBy, orderDirection }:{orderBy:string, orderDirection:string}) => {
  const [repositories, setRepositories] = useState<any>();
  const { loading, error, data,refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!loading && !error) {
      setRepositories(data.repositories);
    }
  }, [data, error, loading]);
  
  useEffect(() => {
    refetch({ orderBy, orderDirection });
  }, [orderBy, orderDirection]);
  
  return { repositories:data, loading };
};

export default useRepositories;
 