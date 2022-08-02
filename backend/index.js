import { ApolloServer } from 'apollo-server';
import { connectDB } from './db/connectDB.js';
import { typeDefs } from './schemas/schema.js';
import { resolvers } from './resolvers/index.js';

import User from './models/user.js';
import Post from './models/post.js';
import Comment from './models/comment.js';

import 'dotenv/config';
import 'colors';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      req,
      db: {
        User,
        Post,
        Comment,
      },
    };
  },
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    server
      .listen({ port: PORT })
      .then(({ url }) =>
        console.log(`Server runnig at ${url}`.cyan.underline.bold)
      );
  } catch (error) {
    console.log(`${error}`.red.bold.underline);
  }
};

start();
