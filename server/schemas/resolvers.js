const { AuthenticationError } = require("apollo-server-express");
const { User, Merch, Item, Game } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("inventory")
        .populate({ path: "inventory", populate: "merch" });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = User.findOne({ _id: context.user._id })
          .populate("inventory")
          .populate({ path: "inventory", populate: "merch" });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    merch: async () => {
      return Merch.find();
    },
  },

  Mutation: {
    addItem: async (parent, { merch }, context) => {
      if (context.user) {
        const item = new Item({ merch });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { inventory: item },
        });
        return item;
      }
      throw new AuthenticationError("Not logged in");
    },

    updateCurrency: async (_, args, context) => {
      if (context.user) {
        await User.findByIdAndUpdate(context.user._id, args, { new: true });
        return User;
      }
      throw new AuthenticationError("Not logged in");
    },

    updateGames: async (_, { score, time }, context) => {
      if (context.user) {
        const game = new Game({ score, time });
        await User.findByIdAndUpdate(context.user._id,{$push: { games: game }});
        return Game;
      }
      throw new AuthenticationError("Not logged in");
    },


    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
