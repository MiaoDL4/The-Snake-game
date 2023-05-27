const { AuthenticationError } = require('apollo-server-express');
const { User , Profile , Product , Category ,Purchase } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profile: async ()=>{// DELETE this is a test
      return await Profile.find().populate('purchased').populate({path:'purchased', populate:'products'});
    },
    product: async ()=> {
      return await Product.find().populate('category');
    },
    purchases: async ()=> {
      return await Purchase.find().populate('products');
    },
    users: async () => {
      return User.find().populate('profile').populate({path:'profile.purchased', populate:'products'});
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('profile').populate({path:'profile', populate:'purchased'}).populate({path:'profile.purchased', populate:'products'});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
