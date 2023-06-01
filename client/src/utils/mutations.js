import { gql } from "@apollo/client";



export const UPDATE_CURRENCY = gql`
mutation Mutation($currency: Int!) {
  updateCurrency(currency: $currency) {
    currency
  }
}
`; 

export const PURCHASE_ITEM = gql`
mutation Mutation($merch: String!, $currency: Int!) {
  addItem(merch: $merch) {
    _id
  }
  updateCurrency(currency: $currency) {
    currency
  }
}
`; 

export const UPDATE_SCORE = gql`
  mutation UpdateScore($wins: Int!, $losses: Int!) {
    updateScore(wins: $wins, losses: $losses) {
      wins
      losses
    }
  }
`;

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
