import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
query Edges {
  repositories {
    edges {
      node {
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