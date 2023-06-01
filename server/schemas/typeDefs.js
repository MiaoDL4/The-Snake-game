const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Merch {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    modifier: String
  }

  type Item {
    _id: ID
    purchaseDate: String
    merch: Merch
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    wins: Int
    losses: Int
    currency: Int
    inventory: [Item]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    merch: [Merch]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addItem(merch: String!): Item
    updateScore(wins: Int!, losses: Int!): User
  }
`;

module.exports = typeDefs;
