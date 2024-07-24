import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = ({ orderBy, orderDirection}:{orderBy:string, orderDirection:string}, searchKeyword  :string) => {
  const [repositories, setRepositories] = useState<any[]>();
  const { loading, error, data,refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });
  
  useEffect(() => {
    if (!loading && !error) {
      setRepositories(data.repositories);
    }
    if (error) {
      console.error(`Error: ${error.message}`);
  }
}, [data, error, loading]);
  
  useEffect(() => {
    refetch({ orderBy, orderDirection, searchKeyword  });
  }, [orderBy, orderDirection, searchKeyword ]);
  
  return { repositories, loading };
};

export default useRepositories;
 