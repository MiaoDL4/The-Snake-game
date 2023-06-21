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
export const ADD_SCORE = gql`
  mutation UpdateGames($score: Int!, $time: Int!) {
    updateGames(score: $score, time: $time) {
      games {
        _id
      }
    }
  }
`;
