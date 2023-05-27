const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    category: Category
  }
  
  type Purchase {
    _id: ID
    purchaseDate: String
    products: Product
  }

  type Profile {
    _id: ID
    win: Int
    loss: Int
    currency: Int
    purchased: [Purchase]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    profile: Profile
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    profile: [Profile]
    product: [Product]
    users: [User]
    user(username: String!): User
    me: User
    purchases: [Purchase]
  }

  type Mutation {

    
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
