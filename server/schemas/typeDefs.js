const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  type Merch {
    _id: ID
    name: String
    description: String
    price: Int
    modifierSnake: String
    modifierBoard: String
    modifierFood: String
  }

  type Item {
    _id: ID
    purchaseDate: String
    merch: Merch
  }

  type Game {
    _id: ID
    score: Int
    time: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    currency: Int
    games: [Game]
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
    updateGames(score: Int!, time: Int!): User
    updateCurrency(currency: Int!): User
  }
`;

module.exports = typeDefs;
