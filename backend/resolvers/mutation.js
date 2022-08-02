import { UserInputError, AuthenticationError } from 'apollo-server';
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

  deletePost: async (parent, args, context, info) => {
    const { id } = auth(context);
    const post = await context.db.Post.findById(args.postId);
    if (post.author != id) {
      throw new AuthenticationError('Action not allowed');
    } else {
      await post.delete();
      return true;
    }
  },

  createComment: async (parent, args, context, info) => {
    const user = auth(context);
    if (args.body.trim() === '') {
      throw new UserInputError('Empty comment', {
        errors: {
          body: 'Comment must not be empty',
        },
      });
    }
    const post = await context.db.Post.findById(args.postId);

    if (post) {
      const comment = await context.db.Comment.create({
        author: user.id,
        body: args.body,
        post: args.postId,
      });
      post.comments.push(comment._id);
      await post.save();
      return post;
    } else {
      throw UserInputError('Post not found!');
    }
  },
  deleteComment: async (parent, args, context, info) => {
    const user = auth(context);
    const comment = await context.db.Comment.findById(args.commentId);
    let post = await context.db.Post.findById(args.postId);
    if (post) {
      if (comment) {
        if (comment.author == user.id) {
          post = await context.db.Post.findByIdAndUpdate(
            args.postId,
            {
              $pull: {
                comments: comment._id,
              },
            },
            {
              new: true,
              runValidotars: true,
            }
          );
          await comment.delete();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Comment not found!');
      }
    } else {
      throw new UserInputError('Post not found!');
    }
  },

  likePost: async (parent, args, context, info) => {
    const user = auth(context);
    let post = await context.db.Post.findById(args.postId);
    if (post) {
      if (post.likes.find((id) => id == user.id)) {
        post.likes = post.likes.filter((id) => id != user.id);
      } else {
        post.likes.push(user.id);
      }
      post = await post.save();
      return post;
    } else {
      throw new UserInputError('Post not found');
    }
  },
};
