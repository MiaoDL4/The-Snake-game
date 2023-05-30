import { gql } from '@apollo/client';

export const ADD_ITEM = gql`
mutation AddItem($merch: [ID]!) {
  addItem(merch: $merch) {
    merch {
      name
    }
  }
}
`;

export const UPDATE_SCORE = gql`
mutation UpdateScore($wins: Int!, $losses: Int!) {
  updateScore(wins: $wins, losses: $losses) {
    wins
    losses
  }
}`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;