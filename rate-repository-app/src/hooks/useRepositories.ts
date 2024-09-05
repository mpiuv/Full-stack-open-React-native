import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = ({ orderBy, orderDirection}:{orderBy:string, orderDirection:string}, searchKeyword  :string): 
                         { repositories: any[]|undefined, loading: boolean, refetch: () => void } => {
  const [repositories, setRepositories] = useState<any[]>();
  if(!searchKeyword) searchKeyword=""

  
  const { loading, error, data,refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword }
  });
  if (error) {
    console.error(`Error: ${error.message}`);
 }

  useEffect(() => {
    if (data && !loading && !error) {
      setRepositories(data.repositories);
    }
    if (error) {
      console.error(`Error: ${error.message}`);
  }
}, [data, error, loading]);
  
  useEffect(() => {
    try{
      refetch({ orderBy, orderDirection, searchKeyword  });}
    catch (e) {console.log("Catch:"+e)}
  }, [orderBy, orderDirection, searchKeyword ]);
  
  return { repositories, loading, refetch };
};

export default useRepositories;
 