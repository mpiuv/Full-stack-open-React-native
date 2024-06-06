import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
mutation addReview ( $repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
  createReview( review: {
    repositoryName: $repositoryName, 
    ownerName: $ownerName,
    rating: $rating,
    text: $text
  }) {
    id
    user {
      id
      username
    }
    repository {
      id
      ownerName
      name
    }
    userId
    repositoryId
    rating
    createdAt
    text
  }
}
`;