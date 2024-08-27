const { User, Turtle } = require('../models');
const { sign, verify } = require('jsonwebtoken');

const { GraphQLError } = require('graphql');

function createToken(user_id) {
  const token = sign({ user_id: user_id }, process.env.JWT_SECRET);

  return token;
}

const resolvers = {
  Query: {
    async getUser(_, args, context) {
      const token = context.req.cookies.token;

      if (!token) {
        throw new GraphQLError({
          message: 'Not Authorized'
        })
      }

      const { user_id } = verify(token, process.env.JWT_SECRET);

      const user = await User.findById(user_id);

      if (!user) {
        throw new GraphQLError({
          message: 'No User Found'
        })
      }

      return {
        message: 'User Found',
        user
      };
    }
  },

  Mutation: {
    async registerUser(_, args, context) {
      try {
        const user = await User.create(args);

        // Create a cookie and attach a JWT token
        const token = createToken(user._id);

        context.res.cookie('token', token, {
          httpOnly: true
        });

        return {
          message: 'User registered successfully!',
          user
        }
      } catch (error) {
        console.log('register error', error);

        throw new GraphQLError('No User Found')
      }
    },

    async loginUser(_, args, context) {
      const user = await User.findOne({
        email: args.email
      });

      if (!user) {
        throw new GraphQLError('No user found by that email address.');
      }

      const valid_pass = await user.validatePassword(args.password);

      if (!valid_pass) {
        throw new GraphQLError('Password incorrect.');
      }

      const token = createToken(user._id); // Create a JWT

      context.res.cookie('token', token, {
        httpOnly: true
      }); // Send a cookie with the JWT attached

      return {
        message: 'Logged in successfully!',
        user
      }
    }

  }
};

module.exports = resolvers;