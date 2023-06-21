import { gql } from "@apollo/client";

export const QUERY_CURRENCY = gql`
  query Query {
    me {
      currency
    }
  }
`;

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
      price
      modifierSnake
      modifierBoard
      modifierFood
    }
  }
`;

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
      currency
      games{
        _id
        score
        time
      }
      inventory {
        _id
        purchaseDate
        merch {
          _id
          name
          description
          modifierSnake
          modifierBoard
          modifierFood
        }
      }
    }
  }
`;
