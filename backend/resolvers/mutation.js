import { UserInputError } from 'apollo-server';
import { auth } from '../config/auth.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../config/validators.js';

export const Mutation = {
  login: async (parent, args, context, info) => {
    const { username, password } = args.input;
    const { valid, errors } = validateLoginInput(username, password);
    if (!valid) {
      throw new UserInputError('Errors', {
        errors,
      });
    }
    const user = await context.db.User.findOne({ username });
    if (!user) {
      errors.general = 'User not found';
      throw new UserInputError('User not found', {
        errors,
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UserInputError('Wrong password', {
        errors: {
          password: 'Wrong password',
        },
      });
    }
    const token = user.createJWT();
    return {
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    };
  },
  register: async (parent, args, context, info) => {
    const { email, username, password, confirmPassword } = args.input;
    const { valid, errors } = validateRegisterInput(
      username,
      email,
      password,
      confirmPassword
    );
    if (!valid) {
      throw new UserInputError('Errors', {
        errors,
      });
    }
    let user = await context.db.User.findOne({ username });
    if (user) {
      throw new UserInputError('Username is taken', {
        errors: {
          username: 'This username is taken',
        },
      });
    }
    user = await context.db.User.create({
      email,
      username,
      password,
    });
    const token = user.createJWT();
    return {
      token,
      username: user.username,
      id: user._id,
      email: user.email,
    };
  },

  createPost: async (parent, args, context, info) => {
    const { id } = auth(context);
    const post = await context.db.Post.create({
      body: args.body,
      author: id,
    });
    return post;
  },
};
