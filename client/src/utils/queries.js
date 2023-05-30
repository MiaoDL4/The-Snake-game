import { gql } from "@apollo/client";

export const QUERY_MERCH = gql`
  query Merch {
    merch {
      _id
      name
      description
      image
      price
    }
  }
`;

export const QUERY_SCORE = gql`
query currentScore {
  me {
    _id
    username
    wins
    losses
  }
}`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id 
      username
      email
      wins
      losses
      currecy
      inventory {
        _id
        purchaseDate
        merch {
          _id
          name
          description
          image
          modifier
        }
      }
    }
  }
`;
