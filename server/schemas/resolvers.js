const { User } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args) => {
      const user = await User.findById(context.user._id);

      return user;
    },
  },
};

module.exports = resolvers;
