import { gql } from "@apollo/client"

export const BASE_REPOSITORY_FIELDS = gql`
  fragment BaseRepositoryFields on Repository {
    description
    forksCount
    fullName
    id
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    url
  }
`;

export const ME = gql`
  query {
    me {
      username
      id
    }
  }
`;

export const GET_REPOSITORY = gql`  
${BASE_REPOSITORY_FIELDS}
query GetRepository($id: ID!) {
  repository(id: $id) {
    ...BaseRepositoryFields
    reviews {
      edges {
        node {
          id
          createdAt
          rating
          text
          user {
            id
            username
          }
        }
      }
    }  
  }
}
`;

export const GET_REPOSITORIES = gql`
  query GetOrderedRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
        id
        fullName
        language
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
       }
      }
    } 
  }
`;