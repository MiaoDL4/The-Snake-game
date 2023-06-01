import { gql } from "@apollo/client";

export const QUERY_MERCH = gql`
query Query {
  me {
    _id
    username
    currency
    inventory {
      merch {
        _id
      }
    }
  }
  merch {
    _id
    name
    description
    image
    price
    modifier
  }
}`;

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
      currency
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
