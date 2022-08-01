import { ApolloServer } from 'apollo-server';
import { connectDB } from './db/connectDB.js';
import { typeDefs } from './schemas/schema.js';
import { Query } from './resolvers/index.js';
import 'dotenv/config';
import 'colors';

const resolvers = {
  Query,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
