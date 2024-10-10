import { gql } from "@apollo/client";

export const CREATE_REVIEW = gql`
  mutation addReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      id
      user {
        id
        username
      }
      repository {
        id
        name
        ownerName
      }
      createdAt
      userId
      repositoryId
      rating
      text
    }
  }
`;

export const CREATE_USER = gql`
  mutation signUp($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation ($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
